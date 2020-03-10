import * as fs from 'fs';
import * as path from 'path';
import checkFileExist from '../helpers/check-file-exists';
import { Figures } from '../@types/common';
import { buildPath } from '../lib/constants';
import { getRandomFont } from './google-fonts-provider';

export async function generateHtmlPage(text: string, figure?: Figures): Promise<void> {
    const pagePath = path.resolve(__dirname, buildPath, 'index.html');
    const page = checkFileExist(pagePath);

    if (page) {
        console.log('Deleting old file');
        fs.unlinkSync(pagePath);
    }

    try {
        const font = await getRandomFont();
        const html = `
            <html>
                <head>
                <link rel="stylesheet" href=${font.url}>
                    <style>
                        body {
                            font-family: "${font.name}";
                            font-size: 48px;
                        }
                        .text {
                            margin-left: 30px;
                        }
                    </style>
                </head>
                <body>
                    <div class="text">${text}</div>
                </body>
            </html>
        `;
        fs.writeFileSync(path.resolve(__dirname, '../..', buildPath, 'index.html'), html);
    } catch (err) {
        console.error('Error while create HTML', err);
    }
}
