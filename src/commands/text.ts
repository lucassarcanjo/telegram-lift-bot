import { Context, NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";

import * as attendance from "../services/attendance";
import { recognize } from "../services/textRecognition";
import { Intent } from "../api/textRecognition";
import { ActionMessage } from "../utils/messages";

// TODO: check if the passenger already exists on db to get defaults
// maybe when the driver manifests
export const text = async (
  context: NarrowedContext<Context, MountMap["text"]>
) => {
  const message = context.message;

  if (!message.text) return;

  try {
    const userIntent = await recognize(message.text);
    const username = message.from?.username ?? "";

    switch (userIntent) {
      case Intent.AnyoneNotGoing: {
        const response = await attendance.userNotGoAction(username);

        if (!response.status) {
          // TODO: Save error logs on telemetrics

          context.reply(ActionMessage.Error);
        } else {
          context.reply(
            ActionMessage["Attendance.NotGoing"](message.from.first_name)
          );
        }

        break;
      }

      case Intent.DriverGoing: {
        const response = await attendance.driverGoAction(username);

        if (!response.status) {
          // TODO: Save error logs on telemetrics

          context.reply(ActionMessage.Error);
        } else {
          context.reply(
            ActionMessage["Attendance.DriverGoing"](message.from.first_name)
          );
        }

        break;
      }

      case Intent.PassengerGoing: {
        const response = await attendance.passengerGoAction(username);

        if (!response.status) {
          // TODO: Save error logs on telemetrics

          context.reply(ActionMessage.Error);
        } else {
          context.reply(
            ActionMessage["Attendance.PassengerGoing"](message.from.first_name)
          );
        }
        break;
      }

      case Intent.Balance:
      default:
        break;
    }
  } catch (error) {}
};
