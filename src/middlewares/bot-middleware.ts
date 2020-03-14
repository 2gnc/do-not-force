import Telegraf from 'telegraf';
import { fullSetName } from '../lib/constants';
import { botUploadStickers } from '../lib/bot-upload-stickers';
import { botClearStickers } from '../lib/bot-clear-stickers';

// import * as path from 'path';с

export default async function(): Promise<void> {
    const bot = new Telegraf(process.env.BOT_API_KEY);
    try {
        bot.start(async (ctx) => {
            console.log('');
        });
        bot.on('message', async (ctx) => {
            const { stickers } = await bot.telegram.getStickerSet(fullSetName);
            await botClearStickers(stickers);
            await botUploadStickers();
        });
        await bot.launch();
        console.log('Telegram bot is started');
    } catch (err) {
        console.error('Error in bot', err);
    }
}

// TODO внедрить winston для логирования
// TODO добавить ретраи на ошибки телеги
// TODO проверять, что bg фигура видна
