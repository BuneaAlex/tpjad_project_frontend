import ScheduleComponent, { TypeOfFiltering } from '../components/ScheduleComponent';

export const HomePage: React.FC = () => {
  

  return (
    <>
      <h1>Upcoming events</h1>
      <ScheduleComponent typeOfFiltering={TypeOfFiltering.afterDate}/>
    </>
  );
};
