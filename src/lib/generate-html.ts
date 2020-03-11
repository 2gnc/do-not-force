import * as fs from 'fs';
import * as path from 'path';
import checkFileExist from '../helpers/check-file-exists';
import mapFigureToPath from '../helpers/map-figure-to-path';
import { buildPath } from './constants';
import { getRandomFont } from '../providers/google-fonts-provider';
import { generateFigure } from './generate-figure';

export async function generateHtmlPage(text: string): Promise<void> {
    const pagePath = path.resolve(__dirname, buildPath, 'index.html');
    const page = checkFileExist(pagePath);

    if (page) {
        console.log('Deleting old file');
        fs.unlinkSync(pagePath);
    }

    const figureSettings = await generateFigure();

    try {
        const font = await getRandomFont();
        const html = `
            <html>
                <head>
                <link rel="stylesheet" href=${font.url}>
                    <style>
                        body {
                            font-family: "${font.name}";
                            font-size: 60px;
                            text-transform: uppercase;
                        }
                        .box {
                            width: 512px;
                            height: 512px;
                            position: relative;
                        }
                        .background-figure,
                        .foreground-figure,
                        .text {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                        }
                        .background-figure {
                            background: ${figureSettings.background.color};
                            clip-path: ${mapFigureToPath(figureSettings.background)};
                        }
                        .foreground-figure {
                            background: ${figureSettings.foreground.color};
                            clip-path: ${mapFigureToPath(figureSettings.foreground)};
                            transform: rotate(${figureSettings.foreground.rotation}deg) scale(0.8);
                        }
                        .text {
                            display: flex;
                            align-items: center;
                            color: ${figureSettings.textColor};  
                            text-align: center;
                            font-weight: bolder;
                            text-shadow: ${figureSettings.textContrastColor} 0 -2px 1px, ${
            figureSettings.textContrastColor
        } 0 2px 1px, ${figureSettings.textContrastColor} 2px 0 1px, ${figureSettings.textContrastColor} -2px 0 1px;
                        }
                    </style>
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
        fs.writeFileSync(path.resolve(__dirname, '../..', buildPath, 'index.html'), html);
    } catch (err) {
        console.error('Error while create HTML', err);
    }
}
