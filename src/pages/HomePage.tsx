import ScheduleComponent from '../components/ScheduleComponent';
import { TypeOfFiltering } from '../types';

export const HomePage: React.FC = () => {
  return (
    <div className='p-4'>
      <h1>Upcoming events</h1>
      <ScheduleComponent typeOfFiltering={TypeOfFiltering.afterDate}/>
    </div>
  );
};
