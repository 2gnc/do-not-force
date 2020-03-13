// получить список стикеров
// для каждого:
//     - получить фигуру
//     - получить шрифт
//     - сгенерировать HTML
//     - сделать скриншот
//     - сгенерировать нужную структуру
//     - загрузить скриншот в телегу
//     - сохранить file_id в массив
// вернуть массив айдишников

import Telegraf from 'telegraf';
import { Fonts } from './google-fonts-provider';
import { createScreenshot } from './screenshot-provider';
import { generateFigure } from '../lib/generate-figure';
import { generateHtmlPage } from '../lib/generate-html';
import { stickers } from '../lib/stickers';
import { fullSetName } from '../lib/constants';

export async function botUploadStickers(): Promise<string[]> {
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
        i++;
    }
    return [''];
}
