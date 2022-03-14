import { User } from "../models/users";
import { DayOfWeek } from "../types";

export const save = async (
  firstName: string | undefined,
  lastName: string | undefined,
  username: string,
  classDayWeek: DayOfWeek[]
) => {
  const user = new User({
    firstName,
    lastName,
    username,
    classDayWeek,
  });
  // TODO: check if user with same username already exists on db
  await user.save();
};
