import * as path from 'path';
import { buildPath } from './lib/constants';
import { generateHtmlPage } from './lib/create-page';
import { createScreenshot } from './lib/save-screenshot';

(async (): Promise<void> => {
    await generateHtmlPage('test text');
    await createScreenshot(buildPath, 'pic.jpeg');
})();
