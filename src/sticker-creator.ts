import { generateHtmlPage } from './lib/generate-html';
import { createScreenshot } from './providers/screenshot-provider';

(async (): Promise<void> => {
    await generateHtmlPage('Давайте не будем форсировать');
    await createScreenshot('pic.png');
})();
