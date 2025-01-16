import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Form, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

interface RegisterState {
  email: string;
  password: string;
  firstName: string,
  lastName: string,
}

export const Register: React.FC = () => {
  const { isAuthenticated, isAuthenticating, register, authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<RegisterState>({ email: '', password: '', firstName: '', lastName: '' });
  const { email, password, firstName, lastName } = state;
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


  const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      firstName: e.target.value || '',
    });
  }, [state]);

  
  const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      lastName: e.target.value || '',
    });
  }, [state]);

  const handleRegister = useCallback(() => {
    console.log('handleRegister...');
    register?.(email, password, firstName, lastName);
  }, [email, password, register, firstName, lastName]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('redirecting to home');
      navigate('/home');
    }
  }, [isAuthenticated]);

  return (
    <Container style={{ maxWidth: '600px', height: 'auto', paddingTop: '2rem' }}>
      <h2>Register</h2>
      <Form>
        <div className='d-flex gap-3 w-100'>
          <Form.Group controlId="formFirstName" className="mb-3 w-50"> 
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3 w-50"> 
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </Form.Group>
        </div>
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

        <div className='d-flex justify-content-start gap-3 mt-3'>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Already have an account?
          </Button>
        </div>
      </Form>
    </Container>


  );
};
