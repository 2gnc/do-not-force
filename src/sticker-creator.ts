import { generateHtmlPage } from './lib/create-page';
import { createScreenshot } from './providers/screenshot-provider';

(async (): Promise<void> => {
    await generateHtmlPage('test text');
    await createScreenshot('pic.png');
})();
