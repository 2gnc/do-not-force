// import Telegraf from 'telegraf';

// import * as fs from 'fs';
// import * as path from 'path';
// // import stickers from '../lib/stickers';

// export async function getStickerId(): Promise<void> {

//     console.log(11);
//     const bot = new Telegraf(process.env.BOT_API_KEY);
//     const result = await bot.telegram.uploadStickerFile(
//         99164457,
//         path.join(__dirname, '../..', 'tmp/screenshots/pic.png'),
//     );
//     console.log(123, result);

//     try {
//         //     const file = await bot.telegram.uploadStickerFile(99164457, {
//         //         source: {
//         //             /* eslint-disable-next-line */
//         //             png_sticker: fs.readFileSync(path.join(__dirname, '../..', 'tmp/screenshots/pic.png')),
//         //             emojis: stickers[0].emojis,
//         //             /* eslint-disable-next-line */
//         //             mask__position: ''
//         //         },
//         //     });
//         //     return file.file_id;
//     } catch (err) {
//         console.error('Error in wrighting set', err);
//     }
// }
