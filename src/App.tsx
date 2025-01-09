import { AuthProvider } from './auth/AuthProvider'; 
import './App.css';
import { PrivateRoutes } from './auth/PrivateRoute'; 
import { ToastProvider } from './utils/ToastContext';

export const App = () => {
  return (
    <div id='app-container'>
      <AuthProvider>
        <ToastProvider>
          <PrivateRoutes/>
        </ToastProvider>
      </AuthProvider>
    </div>
    
  );
}
