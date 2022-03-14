import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { BotContext } from "../types";
import { GreetingMessage } from "../utils/messages";
import { selectDaysOfWeek } from "./user";

export const start = (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  context.reply(`${GreetingMessage.Start}\n\n${GreetingMessage.BasicCommand}`);

  // TODO: If user is not already registered
  selectDaysOfWeek(context);
};
