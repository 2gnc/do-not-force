import Telegraf from 'telegraf';
import { fullSetName } from './constants';
import { botUploadStickers } from './bot-upload-stickers';
import { botClearStickers } from './bot-clear-stickers';

export default async function(): Promise<void> {
    const bot = new Telegraf(process.env.BOT_API_KEY);
    try {
        await bot.launch();
        console.log('Telegram bot is started');
        setInterval(async () => {
            const { stickers } = await bot.telegram.getStickerSet(fullSetName);
            await botClearStickers(stickers);
            await botUploadStickers();
            console.info('Stickers were updated');
        }, 1000 * 60 * 60);
    } catch (err) {
        console.error('Error in bot', err);
    }
}
