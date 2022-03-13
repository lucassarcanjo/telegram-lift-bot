import axios from "axios";

export const textRecogntionApi = axios.create({
  baseURL: process.env.TEXT_RECOGNITION_URL,
  params: {
    "subscription-key": process.env.TEXT_RECOGNITION_KEY,
  },
});
