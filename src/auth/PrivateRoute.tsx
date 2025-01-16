import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { AuthContext, AuthState } from './AuthProvider';
import { HomePage } from '../pages/HomePage';
import { Login } from './Login';
import { NavbarWrapper } from '../components/NavbarWrapper';
import { HistoryPage } from '../pages/HistoryPage';
import { ReservationPage } from '../pages/ReservationPage';
import { Register } from './Register';

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContext<AuthState>(AuthContext);

  return (
    <Router>
      <NavbarWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
          path="/home"
          element={isAuthenticated ? <HomePage/> : <Navigate to="/login" replace />}
          />

          <Route
          path="/history"
          element={isAuthenticated ? <HistoryPage/> : <Navigate to="/login" replace />}
          />

          <Route
          path="/reservation"
          element={isAuthenticated ? <ReservationPage /> : <Navigate to="/login" replace />}
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </NavbarWrapper>
        
    </Router>
  );
};
