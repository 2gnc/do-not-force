import * as path from 'path';
import * as ppt from 'puppeteer';

export async function createScreenshot(filepath: string, outputName: string): Promise<void> {
    try {
        const assetsPath = path.join(__dirname, '../..', filepath);
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(`file://${assetsPath}/index.html`);
        await page.screenshot({
            path: path.join(assetsPath, 'screenshots', outputName),
            quality: 100,
        });
        await browser.close();
    } catch (err) {
        console.log('Error in save screenshot', err);
    }
}

// file:///Users/tgnc/proj/do-not-force/tmp/index.html
// file:///users/tgnc/proj/do-not-force/src/tmp/index.html
