import { Ride } from "../models/rides";
import { ErrorMessage } from "../utils/messages";

export const getExistingRideToday = async () => {
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
