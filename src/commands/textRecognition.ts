import { textRecogntionApi } from "../services/textRecognitionApi";
import { ApiResponse, Intent } from "../services/types";
import * as attendance from "./attendance";

import { ErrorMessage } from "../utils/errors";
import { Maybe } from "../types";

export const recognize = async (message: Maybe<string>, username?: string) => {
  if (!message) {
    throw new Error(ErrorMessage.InvalidMessage);
  }

  if (!username) {
    throw new Error(ErrorMessage.InvalidUsername);
  }

  const response = await textRecogntionApi.get<ApiResponse>("predict", {
    params: {
      query: message,
    },
  });

  if (response.status !== 200) {
    throw new Error(ErrorMessage.TextRecognitionServiceError);
  }

  switch (response.data.prediction.topIntent) {
    // case Intent.AnyoneNotGoing:
    //   attendance.anyoneNotGoing(username);
    //   break;

    case Intent.DriverGoing:
      attendance.driverGoing(username);

      break;

    // case Intent.PassengerGoing:
    //   attendance.passengerGoing(username);

    //   break;

    case Intent.SettingsBalance:

    default:
      break;
  }
  return response.data;
};
