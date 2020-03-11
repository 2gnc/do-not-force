import Telegraf from 'telegraf';

export default async function(): Promise<void> {
    const bot = new Telegraf(process.env.BOT_API_KEY);
    try {
        bot.start((ctx) => ctx.reply('WoW Classic — это симулятор очередей'));
        await bot.launch();
        console.log('Telegram bot is started');
    } catch (err) {
        console.error('Error in bot', err);
    }
}
