import Telegraf from 'telegraf';
import { fullSetName, stickerUpdatePeriod } from '../constants';
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
            console.info(new Date().toLocaleTimeString(), ` START UPLOADING`);
            await botUploadStickers();
            const date = new Date().toLocaleTimeString();
            console.info(date, ' Stickers were updated');
        }, stickerUpdatePeriod * 60);
    } catch (err) {
        console.error('Error in bot', err);
    }
}
