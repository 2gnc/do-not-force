import { generateHtmlPage } from './providers/html-page-provider';
import { createScreenshot } from './providers/screenshot-provider';

(async (): Promise<void> => {
    await generateHtmlPage('test text');
    await createScreenshot('pic.png');
})();
