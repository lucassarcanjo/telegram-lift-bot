import "dotenv/config";
import { Context, Telegraf, Markup } from "telegraf";
import { Update } from "typegram";

import mongoose from "mongoose";

import { recognize } from "./commands/textRecognition";

mongoose.connect(process.env.MONGO_CONNECTION ?? "");

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));

const botToken: string = process.env.BOT_TOKEN ?? "";

const bot: Telegraf<Context<Update>> = new Telegraf(botToken);

bot.start((context) => {
  context.reply(`Hello ${context.from.first_name}!`);
  context.reply(`This is my first bot on Telegram 🚀`);
});

bot.help((context) => {
  context.reply("Send /start to receive a greeting");
  context.reply("Send /keyboard to receive a message with a keyboard");
  context.reply("Send /quit to stop the bot");
});

bot.command("quit", (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);
  // Context shortcut
  ctx.leaveChat();
});

bot.command("keyboard", (ctx) => {
  ctx.reply(
    "Keyboard",
    Markup.inlineKeyboard([
      Markup.button.callback("First option", "first"),
      Markup.button.callback("Second option", "second"),
    ])
  );
});

bot.on("text", async (ctx) => {
  const response = await recognize(ctx.message.text, ctx.from.username);

  ctx.reply(`Luis api response: ${JSON.stringify(response)}`);
  ctx.reply(`Thank you for your contact ${ctx.from.first_name} ☺️`);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
