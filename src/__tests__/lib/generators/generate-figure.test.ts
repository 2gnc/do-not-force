jest.mock('../../../providers/color-provider');
import { generateFigure } from '../../../lib/generators/generate-figure';
import { SceneParams, Figures } from '../../../@types/common';
import { getColorPalette } from '../../../providers/color-provider';

getColorPalette.mockReturnValue(
    Promise.resolve({
        background: 'rgb(130, 9, 62)',
        foreground: 'rgb(130, 9, 62)',
        textColor: '#ffffff',
    }),
);

describe('generateFigure ', () => {
    it(' returns object with figure parameters', async () => {
        const figure: SceneParams = await generateFigure();
        expect(figure.background.figure).toBeGreaterThanOrEqual(0);
        expect(figure.background.figure).toBeLessThanOrEqual(Object.keys(Figures).length - 1);
        expect(figure.foreground.figure).toBeGreaterThanOrEqual(0);
        expect(figure.foreground.figure).toBeLessThanOrEqual(Object.keys(Figures).length - 1);
        console.log(figure);
    });
});
