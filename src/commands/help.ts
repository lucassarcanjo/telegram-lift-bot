import { Context, NarrowedContext } from "telegraf/typings";
import { MountMap } from "telegraf/typings/telegram-types";

export const help = (context: NarrowedContext<Context, MountMap["text"]>) => {
  context.reply(
    `Meus comandos gerais são:
Envie /start para receber um olá! 😁
Envie /about para me conhecer melhor 🤪
Envie /quit para encerrar nossa conversa 😭
`
  );
  context.replyWithMarkdownV2(
    `A partir de alguns recursos de IA eu consigo entender o que você diz para alguns comportamentos:

🔶 Quando você quer ser o *motorista* do dia e diz algo como: "vou de carro hoje"
🔶 Quando você está na *carona* e diz: "eu vou hoje"
🔶 Quando você *não vai* ~pra ir beber~ e diz: "hoje não vou"

Eu também posso mostrar o *balanço de valores* com:
🔷 "Quanto ficou este mês?"
🔷 "Quanto está a conta de hoje?"
`
  );
};
