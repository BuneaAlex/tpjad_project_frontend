import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { getAll } from '../api/schedule_api';
import { AuthContext } from '../auth/AuthProvider';
import "../styles/general.css"
import { EventClickArg } from '@fullcalendar/core';
import { Button, Modal } from 'react-bootstrap';

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

export enum TypeOfFiltering {
  afterDate = 'afterDate',
  beforeDate = 'beforeDate',
  exactDate = 'exactDate'
}

interface ScheduleComponentProps {
  typeOfFiltering: TypeOfFiltering
}

interface EventData {
  title: string;
  start: string;
  end: string;
  description: string;
}

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({typeOfFiltering}) => {
    const { token } = useContext(AuthContext);
    const [events, setEvents] = useState<any[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    const start = event.start ? event.start.toLocaleString() : 'N/A';
    const end = event.end ? event.end.toLocaleString() : 'N/A';
    const room = event.extendedProps.room || "Unknown room";
    const type = event.extendedProps.type || "Unknown type"
    const description = `${type} in ${room}`;
    console.log(event)
    setSelectedEvent({
      title: event.title,
      start,
      end,
      description,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
    useEffect(() => {
        
      const fetchData = async () => {
        try {
          const response = await getAll(token,typeOfFiltering);
          const formattedEvents = formatEvents(response);
          console.log(formattedEvents)
          setEvents(formattedEvents);
          setFilteredEvents(formattedEvents);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
      }, []);
      
  
      const formatEvents = (timeslots: Timeslot[]): any[] => {
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
              room: t.meeting.room, // Add room information for filtering
              type: t.meeting.type
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
          slotMinTime="07:00:00"
          slotMaxTime="23:59:59" 
          eventOverlap={false}
          eventClick={handleEventClick}
        />

        {selectedEvent && (
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Start:</strong> {selectedEvent.start}</p>
            <p><strong>End:</strong> {selectedEvent.end}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
      </div>
    );
  };

export default ScheduleComponent;
