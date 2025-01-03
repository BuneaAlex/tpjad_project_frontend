import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { AuthContext, AuthState } from './AuthProvider';
import { HomePage } from '../pages/HomePage';
import { Login } from './Login';

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContext<AuthState>(AuthContext);

  return (
    <Router>
        
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
        path="/home"
        element={isAuthenticated ? <HomePage/> : <Navigate to="/login" replace />}
        />
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    
    </Router>
  );
};
