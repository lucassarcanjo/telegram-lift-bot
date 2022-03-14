import { Intent } from "../api/textRecognition";
import { Ride } from "../models/rides";
import { ErrorMessage } from "../utils/messages";
import { getExistingRideToday } from "./ride";
import { ActionResult } from "../types";

export const driverGoAction = async (
  username: string
): Promise<ActionResult<Intent.DriverGoing>> => {
  // Get the day ride
  const existingRide = await getExistingRideToday();

  if (!existingRide) {
    // create a new ride
    const ride = new Ride({ driver: username });
    await ride.save();
  } else {
    // overwrite an existing ride
    existingRide.overwrite({ driver: username });
    await existingRide.save();
  }

  return { status: true };
};

export const passengerGoAction = async (
  username: string
): Promise<ActionResult<Intent.PassengerGoing>> => {
  // Get the day ride
  const existingRide = await getExistingRideToday();

  if (!existingRide) {
    throw new Error(ErrorMessage.RideWithoutDriver);
  } else {
    // add passenger
    existingRide.passengers.push(username);
    await existingRide.save();
  }

  return { status: true };
};

// TODO: fix bugs
// driver will not go
// passenger will not go also not works
export const userNotGoAction = async (
  username: string
): Promise<ActionResult<Intent.AnyoneNotGoing>> => {
  // Get the day ride
  const existingRide = await getExistingRideToday();

  if (existingRide) {
    existingRide.passengers = existingRide.passengers.filter(
      (x) => x === username
    );
    await existingRide.save();
  }

  return { status: true };
};
