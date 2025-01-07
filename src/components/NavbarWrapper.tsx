import { useLocation } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import PropTypes from 'prop-types';

interface NavbarProps {
    children: PropTypes.ReactNodeLike,
  }
  
  export const NavbarWrapper: React.FC<NavbarProps> = ({ children }) => {
      const location = useLocation();
      const hideNavbarRoutes = ["/login"];
  
      return (
          <>
              {!hideNavbarRoutes.includes(location.pathname) && <MainNavbar />}
              {children}
          </>
      );
  };