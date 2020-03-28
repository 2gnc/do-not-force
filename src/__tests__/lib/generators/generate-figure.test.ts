jest.mock('../../../providers/color-provider');
import { generateFigure, getFigureCoordinates } from '../../../lib/generators/generate-figure';
import { SceneParams, Figures } from '../../../@types/common';
import { getColorPalette } from '../../../providers/color-provider';

(getColorPalette as jest.Mock).mockReturnValue(
    Promise.resolve({
        background: 'rgb(130, 9, 62)',
        foreground: 'rgb(130, 9, 62)',
        textColor: '#ffffff',
    }),
);

afterAll(() => {
    return jest.unmock('../../../providers/color-provider');
});

describe('generateFigure ', () => {
    it(' returns object with figure parameters', async () => {
        const figure: SceneParams = await generateFigure();
        expect(figure.background.figure).toBeGreaterThanOrEqual(0);
        expect(figure.background.figure).toBeLessThanOrEqual(Object.keys(Figures).length - 1);
        expect(figure.foreground.figure).toBeGreaterThanOrEqual(0);
        expect(figure.foreground.figure).toBeLessThanOrEqual(Object.keys(Figures).length - 1);
    });
});

describe('getFigureCoordinates ', () => {
    it(' for circle returns array with one set of coordinates', () => {
        const result = getFigureCoordinates(Figures.CIRCLE);
        expect(result).toHaveLength(1);
    });
    it(' for ellipse returns array with one set of coordinates with two params', () => {
        const result = getFigureCoordinates(Figures.ELLIPSE);
        expect(result).toHaveLength(1);
        const re = /^([0-9]{2})% ([0-9]{2})%$/;
        const [, num1, num2] = result[0].match(re);
        const matcher = [expect.stringMatching(re)];
        expect(result).toEqual(expect.arrayContaining(matcher));
        expect(+num1).toBeGreaterThanOrEqual(15);
        expect(+num1).toBeLessThanOrEqual(45);
        expect(+num2).toBeGreaterThanOrEqual(35);
        expect(+num2).toBeLessThanOrEqual(50);
    });
    it(' for rectangle returns array with four sets of coordinates with two params', () => {
        const result = getFigureCoordinates(Figures.RECTANGLE);
        expect(result).toHaveLength(4);
        const re = /^([0-9]{1,2})% ([0-9]{1,2})%$/;
        const matcher = [expect.stringMatching(re)];
        expect(result).toEqual(expect.arrayContaining(matcher));
    });
    it(' for triangle returns array with three sets of coordinates with two params', () => {
        const result = getFigureCoordinates(Figures.TRIANGLE);
        expect(result).toHaveLength(3);
        const re = /^([0-9]{1,2})% ([0-9]{1,2})%$/;
        const matcher = [expect.stringMatching(re)];
        expect(result).toEqual(expect.arrayContaining(matcher));
    });
    it(' for unknown figure returns an empty array', () => {
        const result = getFigureCoordinates(4);
        expect(result).toEqual(expect.arrayContaining([]));
    });
});
