import * as fs from 'fs';
import * as path from 'path';
import checkFileExist from '../helpers/check-file-exists';
import { buildPath } from '../lib/constants';
import { getRandomFont } from './google-fonts-provider';
import { generateFigure } from '../lib/generate-figure';
import { FigureParams, Figures } from '../@types/common';

function mapFigureToClipPath(figure: FigureParams): string {
    console.log(figure);
    switch (figure.figure) {
        case Figures.TRIANGLE:
            return `polygon(${figure.coordinates.join(', ')})`;
        default:
            return '';
    }
}

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
                            clip-path: ${mapFigureToClipPath(figureSettings.background)};
                            transform: rotate(${figureSettings.background.rotation}deg)
                        }
                        .foreground-figure {
                            background: ${figureSettings.foreground.color};
                            clip-path: ${mapFigureToClipPath(figureSettings.foreground)};
                            transform: rotate(${figureSettings.foreground.rotation}deg)
                        }
                        .text {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: ${figureSettings.textColor};
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
