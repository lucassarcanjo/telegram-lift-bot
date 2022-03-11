import axios from "axios";

const textRecogntionApi = axios.create({
  baseURL: process.env.TEXT_RECOGNITION_URL,
  timeout: 1000,
  params: {
    "subscription-key": process.env.TEXT_RECOGNITION_KEY,
  },
});

export default textRecogntionApi;
