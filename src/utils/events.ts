import { Timeslot } from "../types";

export const formatEvents = (timeslots: Timeslot[]): any[] => {
  return timeslots.map((t) => {
    const eventDate = new Date(t.date);

    return {
      title: `${t.meeting.name}`,
      start: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        t.interval.start.hour,
        t.interval.start.minutes,
        0
      ).toISOString(),
      end: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        t.interval.end.hour,
        t.interval.end.minutes,
        0
      ).toISOString(),
      extendedProps: {
        userId: t.userId, // Add userId for user access
        room: t.meeting.room, // Add room information for filtering
        type: t.meeting.type,
        uuid: t.uuid,
      },
    };
  });
};