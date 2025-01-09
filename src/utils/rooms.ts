// Todo: this should probably be an entity in the DB

export const rooms = [
  "Room A",
  "Room B",
  "Room C",
];

export const roomOptions = [
  {
    name: "All Rooms",
    value: "",
  },
  ...rooms.map(r => ({ name: r, value: r })),
];

