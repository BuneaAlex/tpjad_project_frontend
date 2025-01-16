import { z } from "zod";
import { useForm } from "@tanstack/react-form"
import { FormField } from "./FormField";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { Button } from "react-bootstrap";
import { makeReservation } from "../api/schedule_api";
import { Reservation, ReservationDTO } from "../types";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import { useToast } from "../utils/ToastContext";

const meetingSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters!"}),
  type: z.string().min(5, { message: "Type must be at least 5 characters!"}),
  room: z.string().nonempty(),
});

const intervalSchema = z.object({
  start: z.string(),
  end: z.string()
});

const reservationSchema = z.object({
  meeting: meetingSchema,
  interval: intervalSchema,
  date: z.string().nonempty().date()
});

export const ReservationForm = (props: any) => {
  const { token, username } = useContext(AuthContext);
  const { setToast, showToast } = useToast();
  const form = useForm<Reservation, ZodValidator>({
    validatorAdapter: zodValidator(),
    validators: {
      onChange: reservationSchema,
    },
    defaultValues: {
      meeting: {
        name: "My Meeting",
        type: "1 on 1",
        room: "",
      },
      interval: {
        start: "12:00",
        end: "13:00",
      },
      date: "",
    },
    onSubmit: async ({value}) => {
      if (!username) {
        return
      }

      const reservationDTO: ReservationDTO = {
        userId: username,
        meeting: value.meeting,
        interval: {
          start: {
            hour: Number(value.interval.start.split(':')[0]),
            minutes: Number(value.interval.start.split(':')[1]),
          },
          end: {
            hour: Number(value.interval.end.split(':')[0]),
            minutes: Number(value.interval.end.split(':')[1]),
          }
        },
        date: value.date,
      }
      // console.log("Form Response: ", value)
      try {
        const response = await makeReservation(token, reservationDTO);
        setToast(
          "Reservation Created!",
          `You have reserved room ${reservationDTO.meeting.room} on ${reservationDTO.date}. Got some business to settle!`
        );
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setToast(
            "Failed to create reservation!",
            `The room you are trying to reserve, ${reservationDTO.meeting.room}, is already booked on ${reservationDTO.date}. Try to find a different room or postpone the meeting!`
          );
        } else {
          setToast(
            "Error",
            "An unexpected error occurred. Please try again later."
          );
        }
      }
      showToast();
    }
  });

  const fieldCreator = form.Field;

  return (
    <div className="w-50 d-flex align-items-center">
      <form
        className="d-flex flex-column gap-4 w-100 justify-content-center align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="d-flex flex-row gap-4 w-100">
          <div className="d-flex flex-column gap-4 w-50">
            <FormField name="meeting.name" label="Meeting Name" fieldCreator={fieldCreator}/>
            <FormField name="meeting.type" label="Meeting Type" fieldCreator={fieldCreator}/>
            <FormField name="meeting.room" label="Meeting Room" fieldCreator={fieldCreator}/>
          </div>
          <div className="d-flex flex-column gap-4 w-50">
            <FormField name="date" label="Date" fieldCreator={fieldCreator}/>
            <FormField name="interval.start" label="Start Time" fieldCreator={fieldCreator} />
            <FormField name="interval.end" label="End Time" fieldCreator={fieldCreator} />
          </div>
        </div>
        {form.Subscribe({
          selector: (state) => [state.canSubmit, state.isSubmitting],
          children: ([canSubmit, isSubmitting]) => {
            return (
              <Button type="submit" disabled={!canSubmit} className="w-25" onClick={form.handleSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )
          }
        })}
      </form>
    </div>
  )
}