import React, { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AuthContext } from '../auth/AuthProvider';
import { EventClickArg } from '@fullcalendar/core';
import { Button, Modal } from 'react-bootstrap';
import { EventData, TypeOfFiltering } from '../types';
import { useEvents } from '../utils/useEvents';
import "../styles/general.css"
import { roomOptions } from '../utils/rooms';
import { cancelReservation } from '../api/schedule_api';
import { useToast } from '../utils/ToastContext';

interface ScheduleComponentProps {
  typeOfFiltering: TypeOfFiltering
  }

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({typeOfFiltering}) => {
  const { username, token } = useContext(AuthContext);
  const { setToast, showToast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { filteredEvents } = useEvents(token, typeOfFiltering, selectedRoom, refetch)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    const start = event.start ? event.start.toLocaleString() : 'N/A';
    const end = event.end ? event.end.toLocaleString() : 'N/A';
    const userId = event.extendedProps.userId;
    const uuid = event.extendedProps.uuid;
    const room = event.extendedProps.room || "Unknown room";
    const type = event.extendedProps.type || "Unknown type"
    const description = `${type} in ${room}`;
    setSelectedEvent({
      uuid,
      userId,
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
  
  const handleRoomFilterChange = (room: string) => {
    setSelectedRoom(room);
  };

  const handleCancelReservation = async (event: any) => {
    const response = await cancelReservation(token, event.uuid, event.userId);
    console.log(response);
    setIsModalOpen(false);
    setRefetch(!refetch);
    setToast("Reservation Cancelled!","You have cancelled this reservation. Something came up?");
    showToast();
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="room-filter">Filter by Meeting Room: </label>
        <select
          id="room-filter"
          value={selectedRoom}
          onChange={(e) => handleRoomFilterChange(e.target.value)}
        >
          {roomOptions.map(r => (<option key={r.value.replace(/\s/g, '')} value={r.value}>{r.name}</option>))}
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
          <p><strong>ID: </strong> {selectedEvent.uuid}</p>
          <p><strong>Start:</strong> {selectedEvent.start}</p>
          <p><strong>End:</strong> {selectedEvent.end}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          {selectedEvent.userId === username && (
            <Button
              variant="danger"
              onClick={() => handleCancelReservation(selectedEvent)}
            >
              Cancel Reservation
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    )}

    </div>
  );
};

export default ScheduleComponent;
