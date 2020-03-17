import * as fs from 'fs';
import * as path from 'path';
import { SceneParams, FontPrepared } from '../../@types/common';
import checkFileExist from '../../helpers/check-file-exists';
import { buildPath, maxFontBoxWidth } from '../constants';
import { generateCss } from './generate-css';

export async function generateHtmlPage(
    text: string,
    filename: string,
    figure: SceneParams,
    font: FontPrepared,
    fontSize: number,
): Promise<void> {
    const pagePath = path.resolve(__dirname, buildPath, 'index.html');
    const page = checkFileExist(pagePath);

    if (page) {
        console.log('Deleting old file');
        fs.unlinkSync(pagePath);
    }

    const { name, url } = font;
    try {
        const html = `
            <html>
                <head>
                <link rel="stylesheet" href=${url}>
                    ${await generateCss(name, figure, fontSize)}
                </head>
                <body>
                    <div class="box">
                        <div class="background-figure"></div>
                        <div class="foreground-figure"></div>
                        <div class="text">
                            <p>${text}</p>
                        </div>
                    </div>
                </body>
                <script>
                    window.onload = function () {
                        const text = document.querySelector('p');
                            console.log(window.getComputedStyle(text).width, text.scrollWidth, text.clientWidth);
                            if (text.clientWidth > ${maxFontBoxWidth}) {
                                const warning = '<div class="warning"></div>';
                                text.insertAdjacentHTML('afterEnd', warning);
                            }
                    };
                </script>
            </html>
        `;
        fs.writeFileSync(path.resolve(__dirname, '../..', buildPath, filename ? filename : 'index.html'), html);
    } catch (err) {
        console.error('Error while create HTML', err);
    }
}
