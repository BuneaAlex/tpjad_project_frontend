import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { login as loginApi } from './authApi';
import { getTokenFromLocalStorage, saveTokenToLocalStorage, saveUsernameToLocalStorage } from '../network/localStorageManager';


type LoginFn = (username?: string, password?: string) => void;
type LogoutFn = () => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  logout?: LogoutFn;
  pendingAuthentication?: boolean;
  username?: string;
  password?: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  token: '',
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { isAuthenticated, isAuthenticating, authenticationError, pendingAuthentication, token, username } = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const logout = useCallback<LogoutFn>(logoutCallback, []);
  useEffect(verifyAlreadyAuthenticated,[]);
  useEffect(authenticationEffect, [pendingAuthentication]);
  const value = { isAuthenticated, login, logout, isAuthenticating, authenticationError, token, username  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  function loginCallback(username?: string, password?: string): void {
    setState({
      ...state,
      pendingAuthentication: true,
      username,
      password
    });
    saveUsernameToLocalStorage(username!);
  }

  function logoutCallback(): void {
    setState({
      ...state,
      isAuthenticated: false
    });
    localStorage.clear();
  }

  function verifyAlreadyAuthenticated()
  {
    let canceled = false;
    verifyToken();
    return () => {
      canceled = true;
    }

    function verifyToken() {
      setState((prevState) => ({
        ...prevState,
        isAuthenticating: true,
      }));
      const tokenLS = getTokenFromLocalStorage();
    
      if (canceled) {
        return;
      }
    
      if (tokenLS !== null) {
        console.log('reauthentication succeeded');
        setState((prevState) => ({
          ...prevState,
          token: tokenLS,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          pendingAuthentication: false,
          isAuthenticating: false,
        }));
      }
    }
    
    }
  

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    }

    async function authenticate() {
      if (!pendingAuthentication) {
        console.log('authenticate, !pendingAuthentication, return');
        return;
      }
      try {
        console.log('authenticate...');
        setState({
          ...state,
          isAuthenticating: true,
        });
        const { username, password } = state;
        const { token } = await loginApi(username, password);
        
        if (canceled) {
          return;
        }
        console.log('authenticate succeeded');
        setState({
          ...state,
          token,
          username,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
        });
        saveTokenToLocalStorage(token);
      } catch (error) {
        if (canceled) {
          return;
        }
        console.log('authenticate failed');
        setState({
          ...state,
          authenticationError: error as Error,
          pendingAuthentication: false,
          isAuthenticating: false,
        });
      }
    }
  }
};
