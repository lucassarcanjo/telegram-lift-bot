import axios from "axios";

const textRecogntionApi = axios.create({
  baseURL: process.env.TEXT_RECOGNITION_URL,
  params: {
    "subscription-key": process.env.TEXT_RECOGNITION_KEY,
  },
});

export { textRecogntionApi };
