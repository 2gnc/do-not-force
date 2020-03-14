import * as fs from 'fs';
import * as path from 'path';
import Telegraf from 'telegraf';
import { Fonts } from '../providers/google-fonts-provider';
import { createScreenshot } from '../providers/screenshot-provider';
import { generateFigure } from './generate-figure';
import { generateHtmlPage } from './generate-html';
import { stickers } from './stickers';
import { fullSetName } from './constants';

export async function botUploadStickers(): Promise<void> {
    try {
        const bot = new Telegraf(process.env.BOT_API_KEY);
        const fonts = new Fonts();
        await fonts.initialize();
        const set = await bot.telegram.getStickerSet(fullSetName);
        let i = 0;
        for (const sticker of stickers) {
            const figure = await generateFigure();
            const font = fonts.randomFont;
            await generateHtmlPage(sticker.text, `${i}.html`, figure, font);
            await createScreenshot(`${i}.html`, `${i}.png`);
            const source = fs.readFileSync(path.join(__dirname, '../../tmp/screenshots', `${i}.png`));
            const { file_id } = await bot.telegram.uploadStickerFile(Number(process.env.MY_ID), {
                source,
            });
            const newSticker = {
                png_sticker: file_id,
                emojis: sticker.emojis,
                mask_position: undefined as any,
            };
            await bot.telegram.addStickerToSet(Number(process.env.MY_ID), set.name, newSticker, false);
            i++;
        }
    } catch (err) {
        console.error('Error in bot-upload-sticker', err);
    }
}
