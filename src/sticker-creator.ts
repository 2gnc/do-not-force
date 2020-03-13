import { generateHtmlPage } from './lib/generate-html';
import { createScreenshot } from './providers/screenshot-provider';
// import { getStickerId } from './providers/bot-generate-stickerpack';

(async (): Promise<void> => {
    await generateHtmlPage('Давайте не будем форсировать');
    await createScreenshot('pic.png');
    // await getStickerId();
})();
