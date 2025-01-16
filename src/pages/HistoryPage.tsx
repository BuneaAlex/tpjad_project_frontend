import ScheduleComponent from '../components/ScheduleComponent';
import { TypeOfFiltering } from '../types';

export const HistoryPage: React.FC = () => {
  return (
    <div className='p-4'>
      <h1>Past events</h1>
      <ScheduleComponent typeOfFiltering={TypeOfFiltering.beforeDate}/>
    </div>
  );
};
