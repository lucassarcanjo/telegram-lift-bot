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

export const GreetingMessage = {
  Start: "Oi! Eu vou te ajudar a simplificar suas caronas 🚀",
  BasicCommand:
    "Digite /help a qualquer momento para conhecer o que posso fazer!",
  About:
    "Fui criado para resolver alguns problemas de balanço de caronas para a faculdade. Para saber mais você pode acessar ",
  Creator: "👨🏻‍💻 Lucas Arcanjo",
};
