import { generateHtmlPage } from './providers/create-page-provider';
import { createScreenshot } from './providers/screenshot-provider';

(async (): Promise<void> => {
    await generateHtmlPage('test text');
    await createScreenshot('pic.png');
})();
