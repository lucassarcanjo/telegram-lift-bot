export enum Intent {
  AnyoneNotGoing = "anyone.notgoing",
  DriverGoing = "driver.going",
  PassengerGoing = "passenger.going",
  Balance = "settings.balance",
  None = "None",
}

export interface ApiResponse {
  query: string;
  prediction: {
    topIntent: Intent;
  };
}
