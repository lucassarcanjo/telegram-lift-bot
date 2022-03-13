import { Intent } from "../api/textRecognition";
import { Ride } from "../models/rides";
import { Maybe } from "../types";
import { ErrorMessage } from "../utils/messages";

export interface ActionResult<T extends Intent> {
  /**
   * Additional message explaining operation result or error
   */
  message?: Maybe<string>;
  /**
   * True is a successful operation. False indicates that operation has errors
   */
  status: boolean;
  /**
   * Operation type based on Intent
   */
  type?: T;
}

// Move away from here
const getExistingRideToday = async () => {
  const dayStartHour = new Date().setUTCHours(0, 0, 0, 0);
  const dayEndHour = new Date().setUTCHours(23, 59, 59, 999);

  const [existingRide, ...othersRides] = await Ride.find({
    datetime: {
      $gte: dayStartHour,
      $lt: dayEndHour,
    },
  });

  if (othersRides?.length) {
    throw new Error(ErrorMessage.MultipleRidesPerDay);
  }

  return existingRide;
};

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
