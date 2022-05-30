import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { BotContext } from "../types";
import { retrieveClassDays, selectDaysOfWeek } from "./user";

export const edit = async (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  const previousSelected = await retrieveClassDays(context);

  selectDaysOfWeek(context, previousSelected);
};
