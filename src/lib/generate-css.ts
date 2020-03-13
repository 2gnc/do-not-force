import mapFigureToPath from '../helpers/map-figure-to-path';
import * as Color from 'color';
import { SceneParams } from '../@types/common';

export async function generateCss(fontName: string, figure: SceneParams): Promise<string> {
    const stroke = new Color(figure.textColor).negate();
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
        background: ${figure.background.color};
        clip-path: ${mapFigureToPath(figure.background)};
        transform: rotate(${figure.background.rotation}deg);
    }
    .foreground-figure {
        background: ${figure.foreground.color};
        clip-path: ${mapFigureToPath(figure.foreground)};
        transform: rotate(${figure.foreground.rotation}deg) scale(0.8);
    }
    .text {
        display: flex;
        align-items: center;
        color: ${figure.textColor};  
        text-align: center;
        font-weight: bold;
        text-shadow: ${stroke} 0 -1px 1px, ${stroke} 0 1px 1px, ${stroke} 1px 0 1px, ${stroke} -1px 0 1px;
    }
</style>`;
}
