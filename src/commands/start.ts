import { Context, NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { GreetingMessage } from "../utils/messages";

export const start = (context: NarrowedContext<Context, MountMap["text"]>) => {
  context.reply(`${GreetingMessage.Start}\n\n${GreetingMessage.BasicCommand}`);
};
