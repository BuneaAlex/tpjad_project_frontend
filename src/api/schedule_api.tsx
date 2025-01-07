import axios from "axios";
import { TypeOfFiltering } from "../components/ScheduleComponent";

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