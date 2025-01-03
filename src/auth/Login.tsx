import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Form, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

interface LoginState {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { isAuthenticated, isAuthenticating, login, authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({ email: '', password: '' });
  const { email, password } = state;
  const navigate = useNavigate();

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: e.target.value || '',
    });
  }, [state]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      email: e.target.value || '',
    });
  }, [state]);

  const handleLogin = useCallback(() => {
    console.log('handleLogin...');
    login?.(email, password);
  }, [email, password, login]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('redirecting to home');
      navigate('/home');
    }
  }, [isAuthenticated]);

  return (
    <Container style={{ maxWidth: '600px', height: 'auto' }}>
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formEmail" className="mb-3"> 
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3"> 
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        {isAuthenticating && (
          <div className="d-flex justify-content-center mb-3"> 
            <Spinner animation="border" />
          </div>
        )}

        {authenticationError && (
          <Alert variant="danger" className="mb-3"> 
            {authenticationError.message || 'Failed to authenticate'}
          </Alert>
        )}

        <Button variant="primary" onClick={handleLogin} className="mt-3">
          Login
        </Button>
      </Form>
    </Container>


  );
};
