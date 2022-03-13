import mongoose from "mongoose";

interface RideDoc extends mongoose.Document {
  id: string;
  datetime: Date;
  driver: string;
  passengers: string[];
}

const schema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  driver: {
    type: String,
    required: true,
  },
  passengers: {
    type: [String],
  },
});

const Ride = mongoose.model<RideDoc>("Ride", schema);

export { Ride };
