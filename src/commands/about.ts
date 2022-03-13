import { Context, NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { GreetingMessage } from "../utils/messages";

export const about = (context: NarrowedContext<Context, MountMap["text"]>) => {
  context.reply(GreetingMessage.About);
  context.reply(GreetingMessage.Creator);
};
