import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { BotContext } from "../types";
import { selectDaysOfWeek } from "./user";

export const edit = (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  selectDaysOfWeek(context);
};
