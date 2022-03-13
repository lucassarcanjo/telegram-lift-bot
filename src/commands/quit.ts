import { Context, NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";

export const quit = (context: NarrowedContext<Context, MountMap["text"]>) => {
  context.leaveChat();
};
