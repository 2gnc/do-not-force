import mapFigureToPath from '../helpers/map-figure-to-path';
import { generateFigure } from './generate-figure';

export async function generateCss(fontName: string): Promise<string> {
    const figureSettings = await generateFigure();

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
        text-shadow: ${figureSettings.textContrastColor} 0 -2px 1px, ${figureSettings.textContrastColor} 0 2px 1px, ${
        figureSettings.textContrastColor
    } 2px 0 1px, ${figureSettings.textContrastColor} -2px 0 1px;
    }
</style>`;
}
