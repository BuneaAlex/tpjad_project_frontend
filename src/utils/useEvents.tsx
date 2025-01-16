import { useEffect, useState } from "react";
import { getAll } from "../api/schedule_api";
import { formatEvents } from "./events";
import { TypeOfFiltering } from "../types";

export const useEvents = (token: string, typeOfFiltering: TypeOfFiltering, room: string, refetch: boolean) => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return
      }
      try {
        const response = await getAll(token, typeOfFiltering);
        const formattedEvents = formatEvents(response);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    }, [token, typeOfFiltering, refetch]);

  useEffect(() => {
    if (room === '') {
      // Show all events if no filter is selected
      setFilteredEvents(events);
    } else {
      // Filter events by the selected room
      setFilteredEvents(events.filter((event) => event.extendedProps?.room === room));
    }
  }, [room, events]);

  // console.log(events, filteredEvents, room)

  return {events, filteredEvents}
}