export const ErrorMessage = {
  InvalidMessage: "Unable to recognize message because is a falsy value",
  InvalidUsername: "Unable to recognize a valid username",
  MultipleRidesPerDay: "Multiple rides are found today, something is bad",
  RideWithoutDriver: "A Ride without a driver can not be created",
};

export const ActionMessage = {
  "Attendance.DriverGoing": (name: string) =>
    `Motorista ${name} confirmado para hoje! 🚘✅`,
  "Attendance.PassengerGoing": (name: string) =>
    `Passageiro ${name} confirmado para hoje! 💅🏽✅`,
  "Attendance.NotGoing": (name: string) =>
    `Removendo ${name} da lista de confirmados hoje 😩❌`,
  Error: "Não consegui resolver isso sozinho 🤯",
};
