import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { useContext } from 'react';
import { useEvents } from '../utils/useEvents';
import { AuthContext } from '../auth/AuthProvider';
import { TypeOfFiltering } from '../types';

export const ImmutableCalendar = () => {
  const { token } = useContext(AuthContext);
  const { events } = useEvents(token, TypeOfFiltering.afterDate, '', false);

  return (
    <div className='w-50'>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        events={events}
        nowIndicator={true}
        dayMaxEvents={true}
        slotMinTime="07:00:00"
        slotMaxTime="23:59:59"
        eventOverlap={false}
        eventClick={() => {}}
      />
    </div>
  );
};
