export interface Timeslot {
  uuid: string;
  userId: string; //(=email) the user that made the reservation (only this user can modify the timestamp)
  meeting: MeetingDetails;
  interval: Interval;
  date: Date
}

export interface MeetingDetails {
  name: string;
  type: string;
  room: string;
}

export interface Interval {
  start: MyTime;
  end: MyTime;
}

interface StringInterval {
  start: string;
  end: string;
}

export interface MyTime {
  hour: number;
  minutes: number;
}

export enum TypeOfFiltering {
  afterDate = 'afterDate',
  beforeDate = 'beforeDate',
  exactDate = 'exactDate'
}

export interface EventData {
  userId: string;
  title: string;
  start: string;
  end: string;
  description: string;
}

export interface Reservation {
  meeting: MeetingDetails;
  interval: StringInterval;
  date: string;
}

export interface ReservationDTO {
  userId: string;
  meeting: MeetingDetails;
  interval: Interval;
  date: string;
}