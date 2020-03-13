import { generateHtmlPage } from './lib/generate-html';
import { createScreenshot } from './providers/screenshot-provider';
// import { getStickerId } from './providers/bot-generate-stickerpack';
// import Fonts from './providers/google-fonts-provider';

(async (): Promise<void> => {
    await generateHtmlPage('Давайте не будем форсировать');
    await createScreenshot('pic.png');
    // await getStickerId();
    // const fonts = new Fonts();
    // await fonts.initialize();
    // console.log(fonts.fonts.length);
    // console.log(fonts.randomFont);
})();
