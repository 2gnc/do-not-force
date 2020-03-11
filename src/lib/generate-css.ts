import mapFigureToPath from '../helpers/map-figure-to-path';
import * as Color from 'color';
import { generateFigure } from './generate-figure';

export async function generateCss(fontName: string): Promise<string> {
    const figureSettings = await generateFigure();
    const stroke = new Color(figureSettings.textColor).negate();
    return `<style>
    body {
        font-family: "${fontName}";
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
        transform: rotate(${figureSettings.background.rotation}deg);
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
        font-weight: bold;
        text-shadow: ${stroke} 0 -1px 1px, ${stroke} 0 1px 1px, ${stroke} 1px 0 1px, ${stroke} -1px 0 1px;
    }
</style>`;
}
