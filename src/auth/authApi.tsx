import axios from 'axios';

export interface AuthProps {
  token: string;
}


export const login = async (username?: string, password?: string): Promise<AuthProps> => {
  const url = 'http://localhost:8080/auth/login';
  const requestData = {
    username,
    password,
  };

  const config = {
    method: 'post',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: requestData,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};


export const logout = async (token:string) => {
  const url = 'http://localhost:8080/auth/logout';
  
  const config = {
    method: 'post',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};

export const register = async (username?: string, password?: string, firstName?: string, lastName?: string): Promise<AuthProps> => {
  const url = 'http://localhost:8080/auth/register';
  const requestData = { 
    email: username,
    password,
    firstname: firstName,
    lastname: lastName
  } 
  const config = {
    method: 'post',
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: requestData,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
}
