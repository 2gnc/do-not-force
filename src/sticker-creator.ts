import { generateHtmlPage } from './lib/generate-html';
import { createScreenshot } from './providers/screenshot-provider';

(async (): Promise<void> => {
    await generateHtmlPage('test text');
    await createScreenshot('pic.png');
})();
