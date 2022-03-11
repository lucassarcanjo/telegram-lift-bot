import { Ride } from "../models/rides";
import { ErrorMessage } from "../utils/errors";

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

export const driverGoing = async (username: string) => {
  // Validate parameters

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

  return;
};

export const passengerGoing = (username: string) => {};

export const anyoneNotGoing = (username: string) => {};
