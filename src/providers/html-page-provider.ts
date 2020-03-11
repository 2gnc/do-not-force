import * as fs from 'fs';
import * as path from 'path';
import checkFileExist from '../helpers/check-file-exists';
import { buildPath } from '../lib/constants';
import { getRandomFont } from './google-fonts-provider';
import { generateFigure } from '../lib/generate-figure';
import { FigureParams, Figures } from '../@types/common';

function mapFigureToClipPath(figure: FigureParams): string {
    console.log('FIGURE', figure);
    switch (figure.figure) {
        case Figures.TRIANGLE:
        case Figures.RECTANGLE:
            return `polygon(${figure.coordinates.reverse().join(', ')})`;
        case Figures.CIRCLE:
            return `circle(${figure.coordinates[0]} at 50% 50%)`;
        case Figures.ELLIPSE:
            return `ellipse(${figure.coordinates[0]} at 50% 50%)`;
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
                            transform: rotate(${figureSettings.background.rotation}deg);
                            transform: rotate(${figureSettings.foreground.rotation}deg) scale(0.8);
                        }
                        .foreground-figure {
                            background: ${figureSettings.foreground.color};
                            clip-path: ${mapFigureToClipPath(figureSettings.foreground)};
                            transform: rotate(${figureSettings.foreground.rotation}deg) scale(0.6);
                        }
                        .text {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: ${figureSettings.textColor};
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
