import { useCallback, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import ScheduleComponent from '../components/ScheduleComponent';

export const HomePage: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    console.log('Logging out...');
    logout?.(); 
  }, [logout]);

  return (
    <div>
      <h1>Home</h1>
      <ScheduleComponent/>
      
      {isAuthenticated ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};
