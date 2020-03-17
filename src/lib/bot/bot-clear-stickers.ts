import Telegraf from 'telegraf';

export async function botClearStickers(set: any[]): Promise<void> {
    try {
        const bot = new Telegraf(process.env.BOT_API_KEY);
        for (const item of set) {
            await bot.telegram.deleteStickerFromSet(item.file_id);
        }
    } catch (err) {
        console.error('Error in bot-clear-stickers', err);
    }
}
