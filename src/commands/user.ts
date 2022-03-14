import { Markup } from "telegraf";
import { NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";
import { save } from "../services/user";
import { DayOfWeek, BotContext } from "../types";

const showText = (
  condition: boolean | undefined,
  character: string,
  message: string
) => `${condition ? character : ""} ${message}`;

export const selectDaysOfWeek = (
  context: NarrowedContext<BotContext, MountMap["text"]>
) => {
  const days = context.session;

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
