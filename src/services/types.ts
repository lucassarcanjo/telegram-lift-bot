// mapping only useful properties
export enum Intent {
  AnyoneNotGoing = "anyone.notgoing",
  DriverGoing = "driver.going",
  PassengerGoing = "passenger.going",
  SettingsBalance = "settings.balance",
  None = "None",
}

export interface ApiResponse {
  query: string;
  prediction: {
    topIntent: Intent;
  };
}
