import { Telegraf } from "telegraf";
import { telegrafThrottler } from "telegraf-throttler";
import RedisSession from "telegraf-session-redis";
import mongoose from "mongoose";

import { text, start, help, quit, about, onDay, dayConfirm } from "./commands";
import { BotContext } from "./types";

export const startup = () => {
  // Database connection
  const mongoConnectionString = process.env.MONGO_CONNECTION ?? "";
  mongoose.connect(mongoConnectionString);

  // Bot configurations
  const botToken = process.env.BOT_TOKEN ?? "";
  const bot = new Telegraf<BotContext>(botToken);

  const throttler = telegrafThrottler();
  const session = new RedisSession({
    store: {
      host: process.env.REDIS_HOST ?? "",
      port: process.env.REDIS_PORT ?? "",
      password: process.env.REDIS_PASSWORD ?? "",
    },
  });

  bot.start(start);
  bot.use(throttler);
  bot.use(session);

  bot.help(help);
  bot.on("text", text);

  bot.command("quit", quit);
  bot.command("info", about);

  bot.action("monday", onDay("monday"));
  bot.action("tuesday", onDay("tuesday"));
  bot.action("wednesday", onDay("wednesday"));
  bot.action("thursday", onDay("thursday"));
  bot.action("friday", onDay("friday"));
  bot.action("dayConfirm", dayConfirm);

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
