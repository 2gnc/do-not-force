import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.BOT_API_KEY);

bot.start((ctx) => ctx.reply('WoW Classic — это симулятор очередей'));
bot.launch().then(() => console.log('Telegram bot started'));
