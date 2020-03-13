import Telegraf from 'telegraf';
import * as fs from 'fs';
import * as path from 'path';
import { setName, fullSetName } from '../lib/constants';
import { botUploadStickers } from '../providers/bot-upload-stickers';

// import * as path from 'path';с

export default async function(): Promise<void> {
    const bot = new Telegraf(process.env.BOT_API_KEY);
    try {
        bot.start(async (ctx) => {
            // console.log(ctx.me);
            // ctx.reply('WoW Classic — это симулятор очередей'));
            // const botUsername = ctx.me;
            // console.log(botUsername);
            // const stickerId = process.env.STICKER_FILE_ID;
            // const fileId = 'BQACAgIAAxUAAV5rdMCpDjuILjSZ7WrRX3pW9wGzAAIDBgACXeRgS_FteHi7GjgVGAQ';
            // console.log(fileId);
            // const botUsername = process.env.BOT_NAME;
            // const userId = Number(process.env.MY_ID);
            // await ctx.telegram.createNewStickerSet(
            //     userId,
            //     `${setName}_by_${botUsername}`,
            //     'Do Not Force dynamic stickerpack',
            //     {
            //         png_sticker: fileId,
            //         emojis: '💩',
            //         mask_position: undefined,
            //     },
            // );
            // const stickerSet = await bot.telegram.getStickerSet(`${setName}_by_${botUsername}`);
            // console.log(1111, stickerSet);
            // const sticker = stickerSet.stickers[0];
            // return ctx.replyWithSticker('CAACAgIAAxUAAV5rd-bWFmsgus-Q74hgxUFHczAkAAIDAAMpIekF8UeOPJU9vt4YBA');
        });
        bot.on('message', async (ctx) => {
            await botUploadStickers();
        });
        await bot.launch();
        // const pic = fs.readFileSync(path.join(__dirname, '../../tmp/screenshots/pic.png'));
        // console.log(pic);
        // const file = await bot.telegram.uploadStickerFile(Number(process.env.BOT_ID), {
        //     source: pic,
        // });

        // const file = await bot.telegram.uploadStickerFile(ownerId, {
        //     source: await result.getBuffer(),
        //   })
        const set = await bot.telegram.getStickerSet(fullSetName);
        console.log(set);
        // await bot.telegram.deleteStickerFromSet(set.stickers[0].file_id);
        // console.log(123, set);
        // bot.on('sticker', (ctx) => console.log(ctx.update));
        // const result = await bot.telegram.uploadStickerFile(
        //     99164457,
        //     path.join(__dirname, '../..', 'tmp/screenshots/pic.png'),
        // );
        // console.log(123, result);
        console.log('Telegram bot is started');
    } catch (err) {
        console.error('Error in bot', err);
    }
}
