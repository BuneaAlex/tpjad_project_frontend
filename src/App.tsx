import { AuthProvider } from './auth/AuthProvider'; 
import './App.css';
import { PrivateRoutes } from './auth/PrivateRoute'; 

export const App = () => {
  return (
    <div id='app-container'>
      <AuthProvider>
        <PrivateRoutes/>
      </AuthProvider>
    </div>
    
  );
}
