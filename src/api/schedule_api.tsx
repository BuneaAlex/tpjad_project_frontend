import axios from "axios";
import { ReservationDTO, TypeOfFiltering } from "../types";

const getCurrentDateISO = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
  });

  return formatter.format(now);
};

export const getAll = async (token:string, type:TypeOfFiltering) => {
  const url = `http://localhost:8080/reservation/${type.toString()}?date=${getCurrentDateISO()}`;
  const config = {
    method: 'get',
    url,
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

export const makeReservation = async (token: string, reservation: ReservationDTO) => {
  const url = 'http://localhost:8080/reservation/new';
  const json = JSON.stringify(reservation);
  const config = {
    method: 'post',
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: json,    
  }
  
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};

export const cancelReservation = async (token: string, reservationId: string, userId: string) => {
  const url = 'http://localhost:8080/reservation/remove';
  const config = {
    method: 'delete',
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    params: {
      uuid: reservationId,
      userId,
    }
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
}