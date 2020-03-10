import * as fs from 'fs';
import * as path from 'path';
import checkFileExist from '../helpers/check-file-exists';
import { Figures } from '../@types/common';
import { buildPath } from './constants';

export function generateHtmlPage(text: string, figure?: Figures): void {
    const pagePath = path.resolve(__dirname, buildPath, 'index.html');
    const page = checkFileExist(pagePath);

    if (page) {
        console.log('Deleting old file');
        fs.unlinkSync(pagePath);
    }

    try {
        const html = `
            <html>
                <head>
                </head>
                <body>
                    <div>${text}</div>
                </body>
            </html>
        `;
        fs.writeFileSync(path.resolve(__dirname, '../..', buildPath, 'index.html'), html);
    } catch (err) {
        console.error('Error while create HTML', err);
    }
}
