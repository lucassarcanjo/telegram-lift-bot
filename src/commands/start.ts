import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { getByUsername } from "../services/user";
import { BotContext } from "../types";
import { GreetingMessage } from "../utils/messages";
import { selectDaysOfWeek } from "./user";

export const start = async (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  await context.reply(
    `${GreetingMessage.Start}\n\n${GreetingMessage.BasicCommand}`
  );

  // TODO: If user is not already registered
  const username = context.from.username ?? context.from.id.toString();

  const [user, ...others] = await getByUsername(username);

  if (others?.length > 0) {
    context.reply("Seu nome está duplicado no banco de dados 🤯");
    throw new Error("More than one document with same username has found");
  }

  if (!user) {
    selectDaysOfWeek(context);
  }
};
