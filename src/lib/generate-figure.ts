import * as Chance from 'chance';
import { Figures, SceneParams, FigureCoorginates } from '../@types/common';
import { getColorPalette } from '../providers/color-provider';
import rPercent from '../helpers/get-random-percent';

function getFigureCoordinates(figure: number): FigureCoorginates {
    const chance = new Chance();
    const coordinates: FigureCoorginates = [];
    switch (figure) {
        // case Figures.CIRCLE:
        //     coordinates.push(chance.integer({ min: 450, max: 512 })); // radius
        //     break;
        // case Figures.ELLIPSE:
        //     coordinates.push(chance.integer({ min: 450, max: 512 })); // width
        //     coordinates.push(chance.integer({ min: 100, max: 400 })); // height
        //     break;
        case Figures.RECTANGLE:
            coordinates.push(`${rPercent()}% 0%`);
            coordinates.push(`100% ${rPercent()}%`);
            coordinates.push(`${rPercent()}% 100%`);
            coordinates.push(`0% ${rPercent()}%`);
            break;
        case Figures.TRIANGLE:
            coordinates.push(`${chance.integer({ min: 30, max: 100 })}% 0%`);
            coordinates.push(`0% ${chance.integer({ min: 30, max: 100 })}%`);
            coordinates.push(`100% ${chance.integer({ min: 30, max: 100 })}%`);
            break;
        default:
            break;
    }
    return coordinates;
}

export async function generateFigure(): Promise<SceneParams> {
    const chance = new Chance();

    const colors = await getColorPalette(chance.color({ format: 'rgb' }));

    const bgFigure = chance.integer({ min: 0, max: 1 /*Object.keys(Figures).length / 2 */ });
    const fgFigure = chance.integer({ min: 0, max: 1 /*Object.keys(Figures).length / 2 */ });
    const bgRotation = chance.integer({ min: 0, max: 350 });
    const fgRotation = chance.integer({ min: 0, max: 350 });

    return {
        background: {
            color: colors.background,
            figure: bgFigure,
            coordinates: getFigureCoordinates(bgFigure),
            rotation: bgRotation,
        },
        foreground: {
            color: colors.foreground,
            figure: fgFigure,
            coordinates: getFigureCoordinates(fgFigure),
            rotation: fgRotation,
        },
        textColor: colors.textColor,
        textContrastColor: colors.textContrastColor,
    };
}
