import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import EventInput from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';

interface TimeslotAPI {
    timeslots: Timeslot[];
}

interface Timeslot {
    uuid: string;
    userId: string; //(=email) the user that made the reservation (only this user can modify the timestamp)
    meeting: MeetingDetails;
    interval: Interval;
    date: Date
}
  
interface MeetingDetails {
    name: string;
    type: string;
    room: string;
}

interface Interval {
    start: MyTime;
    end: MyTime;
}

interface MyTime {
    hour: number;
    minutes: number;
}

const ScheduleComponent: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>(''); // Default filter for all rooms
  
    useEffect(() => {
        // Fetch timetable data (commented out for testing)
        /*
        axios
          .get<TimeslotAPI>("endpoint")
          .then((response) => {
            const formattedEvents = formatEvents(response.data.timeslots);
            setEvents(formattedEvents);
            setFilteredEvents(formattedEvents); // Initialize with all events
          })
          .catch((error) => {
            console.error('Error fetching timetable data:', error);
          });
        */
      
        // Hardcoded data for testing
        const hardcodedTimeslots: Timeslot[] = [
            {
              uuid: '1',
              userId: 'user1',  
              meeting: { name: 'Meeting A', type: 'Team Meeting', room: 'Room A' },
              interval: { start: { hour: 10, minutes: 0 }, end: { hour: 11, minutes: 0 } },
              date: new Date('2025-02-05'),
            },
            {
              uuid: '2',
              userId: 'user2',  
              meeting: { name: 'Meeting B', type: 'Client Presentation', room: 'Room B' },
              interval: { start: { hour: 14, minutes: 30 }, end: { hour: 15, minutes: 30 } },
              date: new Date('2025-01-07'),
            },
            {
              uuid: '3',
              userId: 'user3',  
              meeting: { name: 'Workshop', type: 'Training', room: 'Room A' },
              interval: { start: { hour: 9, minutes: 0 }, end: { hour: 12, minutes: 0 } },
              date: new Date('2025-01-09'),
            },
        ];
        
          
      
        const formattedEvents = formatEvents(hardcodedTimeslots);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents); // Initialize with all events
      }, []);
      
  
      const formatEvents = (timeslots: Timeslot[]): any[] => {
        return timeslots.map((t) => {
          const eventDate = new Date(t.date);
      
          return {
            title: `${t.meeting.name} (${t.meeting.type})`,
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
              room: t.meeting.room, // Add room information for filtering
            },
          };
        });
      };
      
      
  
    const handleRoomFilterChange = (room: string) => {
      setSelectedRoom(room);
      if (room === '') {
        // Show all events if no filter is selected
        setFilteredEvents(events);
      } else {
        // Filter events by the selected room
        setFilteredEvents(events.filter((event) => event.extendedProps?.room === room));
      }
    };
  
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="room-filter">Filter by Meeting Room: </label>
          <select
            id="room-filter"
            value={selectedRoom}
            onChange={(e) => handleRoomFilterChange(e.target.value)}
          >
            <option value="">All Rooms</option>
            <option value="Room A">Room A</option>
            <option value="Room B">Room B</option>
            <option value="Room C">Room C</option>
          </select>
        </div>
        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,listWeek',
          }}
          initialView="timeGridWeek"
          events={filteredEvents} // Pass filtered events here
          nowIndicator={true}
          editable={true}
          selectable={true}
          dayMaxEvents={true}
        />
      </div>
    );
  };

export default ScheduleComponent;
