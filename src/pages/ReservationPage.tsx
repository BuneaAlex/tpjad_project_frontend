import { ImmutableCalendar } from "../components/ImmutableCalendar"
import { ReservationForm } from "../components/ReservationForm"


export const ReservationPage = () => {
  return (
    <div>
      <h1>Reserve a room</h1>
      <div className="d-flex flex-row gap-4 w-100%">
        <ReservationForm />
        <ImmutableCalendar />
      </div>
    </div>
  )
}