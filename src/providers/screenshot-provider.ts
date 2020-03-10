import * as path from 'path';
import * as ppt from 'puppeteer';

export async function createScreenshot(outputName: string): Promise<void> {
    try {
        const assetsPath = path.join(__dirname, '../..', 'tmp');
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(`file://${assetsPath}/index.html`);
        await page.screenshot({
            path: path.join(assetsPath, 'screenshots', outputName),
            omitBackground: true,
            // quality: 100,
            clip: {
                x: 0,
                y: 0,
                width: 512,
                height: 512,
            },
        });
        await browser.close();
    } catch (err) {
        console.log('Error in save screenshot', err);
    }
}