import { User } from "../models/users";
import { DayOfWeek } from "../types";

export const save = async (
  firstName: string | undefined,
  lastName: string | undefined,
  username: string,
  classDayWeek: DayOfWeek[]
) => {
  const query = { username };

  await User.updateOne(
    query,
    {
      firstName,
      lastName,
      username,
      classDayWeek,
    },
    { upsert: true }
  );
};

export const getByUsername = async (username: string) => {
  return User.find({ username }).exec();
};
