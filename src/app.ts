import { Telegraf } from "telegraf";
import mongoose from "mongoose";

import { text, start, help, quit, about } from "./commands";

export const startup = () => {
  // Database connection
  const mongoConnectionString = process.env.MONGO_CONNECTION ?? "";
  mongoose.connect(mongoConnectionString);

  // Bot configuration
  const botToken = process.env.BOT_TOKEN ?? "";
  const bot = new Telegraf(botToken);

  bot.start(start);
  bot.help(help);
  bot.on("text", text);
  bot.command("quit", quit);
  bot.command("about", about);
  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
