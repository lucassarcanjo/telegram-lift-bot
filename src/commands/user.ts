import { Markup } from "telegraf";
import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { getByUsername, save } from "../services/user";
import { BotContext, DayOfWeek } from "../types";

const showText = (
  condition: boolean | undefined,
  character: string,
  message: string
) => `${condition ? character : ""} ${message}`;

export const selectDaysOfWeek = (
  context: NarrowedContext<BotContext, MountMap["text"]>,
  previousSelected?: BotContext["session"]
) => {
  const days = previousSelected ?? context.session;

  context.reply(
    "Preciso saber quais dias você vai à aula!",
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          showText(days?.monday, "✅", "Segunda"),
          "monday"
        ),
        Markup.button.callback(
          showText(days?.tuesday, "✅", "Terça"),
          "tuesday"
        ),
        Markup.button.callback(
          showText(days?.wednesday, "✅", "Quarta"),
          "wednesday"
        ),
      ],
      [
        Markup.button.callback(
          showText(days?.thursday, "✅", "Quinta"),
          "thursday"
        ),
        Markup.button.callback(showText(days?.friday, "✅", "Sexta"), "friday"),
      ],
      [Markup.button.callback("OK", "dayConfirm")],
    ])
  );
};

export const onDay =
  (selectedDay: DayOfWeek) =>
  async (context: NarrowedContext<BotContext, MountMap["callback_query"]>) => {
    const days = context.session;

    // Update current day on session cache
    context.session[selectedDay] = !days?.[selectedDay];

    await context.editMessageText(
      "Preciso saber quais dias você vai à aula!",
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            showText(days?.monday, "✅", "Segunda"),
            "monday"
          ),
          Markup.button.callback(
            showText(days?.tuesday, "✅", "Terça"),
            "tuesday"
          ),
          Markup.button.callback(
            showText(days?.wednesday, "✅", "Quarta"),
            "wednesday"
          ),
        ],
        [
          Markup.button.callback(
            showText(days?.thursday, "✅", "Quinta"),
            "thursday"
          ),
          Markup.button.callback(
            showText(days?.friday, "✅", "Sexta"),
            "friday"
          ),
        ],
        [Markup.button.callback("OK", "dayConfirm")],
      ])
    );
  };

export const dayConfirm = async (
  context: NarrowedContext<BotContext, MountMap["callback_query"]>
) => {
  const days = context.session;
  const user = context.from;

  if (!user) {
    context.reply(
      "Quem é você? Não consegui achar nenhuma informação por aqui 😱"
    );

    return;
  }

  const daysList = Object.keys(days).filter(
    (x) => days[x as keyof typeof days]
  ) as DayOfWeek[];

  await save(
    user.first_name,
    user.last_name,
    user.username ?? user.id.toString(),
    daysList
  );

  context.reply("Beleza! Já tá tudo anotado aqui 🧠");
};

export const retrieveClassDays = async (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  const username = context.from.username ?? context.from.id.toString();

  const [user] = await getByUsername(username);

  if (!user) {
    return;
  }

  return {
    monday: user.classDayWeek.includes("monday"),
    tuesday: user.classDayWeek.includes("tuesday"),
    wednesday: user.classDayWeek.includes("wednesday"),
    thursday: user.classDayWeek.includes("thursday"),
    friday: user.classDayWeek.includes("friday"),
  };
};
