import { textRecogntionApi, ApiResponse, Intent } from "../api/textRecognition";
import { ErrorMessage } from "../utils/messages";
import { Maybe } from "../types";

export const recognize = async (message: Maybe<string>): Promise<Intent> => {
  if (!message) {
    throw new Error(ErrorMessage.InvalidMessage);
  }

  const response = await textRecogntionApi.get<ApiResponse>("predict", {
    params: {
      query: message,
    },
  });

  return response.data.prediction.topIntent;
};
