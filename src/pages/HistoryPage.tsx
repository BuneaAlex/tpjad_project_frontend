import ScheduleComponent, { TypeOfFiltering } from '../components/ScheduleComponent';

export const HistoryPage: React.FC = () => {
  
  return (
    <>
      <h1>Past events</h1>
      <ScheduleComponent typeOfFiltering={TypeOfFiltering.beforeDate}/>
    </>
  );
};
