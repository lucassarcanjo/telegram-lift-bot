import mongoose from "mongoose";
import { DayOfWeek } from "../types";

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  classDayWeek: DayOfWeek[];
}

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  classDayWeek: {
    type: [String],
    default: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  },
});

const User = mongoose.model<UserDoc>("User", schema);

export { User };
