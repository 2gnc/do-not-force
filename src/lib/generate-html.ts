import * as fs from 'fs';
import * as path from 'path';
import { Figures, SceneParams, FigureCoorginates } from '../@types/common';
import checkFileExist from '../helpers/check-file-exists';
import { buildPath } from './constants';
import { generateCss } from './generate-css';
import { Fonts } from '../providers/google-fonts-provider';

export async function generateHtmlPage(text: string, filename?: string, figure?: SceneParams): Promise<void> {
    const pagePath = path.resolve(__dirname, buildPath, 'index.html');
    const page = checkFileExist(pagePath);
    const fonts = new Fonts();
    await fonts.initialize();

    if (page) {
        console.log('Deleting old file');
        fs.unlinkSync(pagePath);
    }

    const { name, url } = fonts.randomFont;
    try {
        const html = `
            <html>
                <head>
                <link rel="stylesheet" href=${url}>
                    ${await generateCss(name, figure)}
                </head>
                <body>
                    <div class="box">
                        <div class="background-figure"></div>
                        <div class="foreground-figure"></div>
                        <div class="text">${text}</div>
                    </div>
                </body>
            </html>
        `;
        fs.writeFileSync(path.resolve(__dirname, '../..', buildPath, filename ? filename : 'index.html'), html);
    } catch (err) {
        console.error('Error while create HTML', err);
    }
}
