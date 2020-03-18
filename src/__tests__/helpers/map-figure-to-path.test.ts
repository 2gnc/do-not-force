import mapFigureToPath from '../../helpers/map-figure-to-path';
import { FigureParams, Figures } from '../../@types/common';

describe('map-figure-to-pat ', () => {
    it('should return string with polygon for triangle', () => {
        const figure: FigureParams = {
            color: '#000000',
            figure: Figures.TRIANGLE,
            coordinates: ['50% 0%', '0% 100%', '100% 100%'],
            rotation: 50,
        };
        const result = mapFigureToPath(figure);
        expect(result).toBe('polygon(100% 100%, 0% 100%, 50% 0%)');
    });
    it('should return string with polygon for rectangle', () => {
        const figure: FigureParams = {
            color: '#000000',
            figure: Figures.RECTANGLE,
            coordinates: ['20% 0%', '80% 0%', '100% 100%', '0% 100%'],
            rotation: 50,
        };
        const result = mapFigureToPath(figure);
        expect(result).toBe('polygon(0% 100%, 100% 100%, 80% 0%, 20% 0%)');
    });
    it('should return string with circle for circle', () => {
        const figure: FigureParams = {
            color: '#000000',
            figure: Figures.CIRCLE,
            coordinates: ['50% 50%'],
            rotation: 50,
        };
        const result = mapFigureToPath(figure);
        expect(result).toBe('circle(50% 50% at 50% 50%)');
    });
    it('should return string with ellipse for ellipse', () => {
        const figure: FigureParams = {
            color: '#000000',
            figure: Figures.ELLIPSE,
            coordinates: ['50% 50%'],
            rotation: 50,
        };
        const result = mapFigureToPath(figure);
        expect(result).toBe('ellipse(50% 50% at 50% 50%)');
    });
    it('should return empty string for unknown figure', () => {
        const figure: FigureParams = {
            color: '#000000',
            figure: 10 as Figures,
            coordinates: ['50% 50%'],
            rotation: 50,
        };
        const result = mapFigureToPath(figure);
        expect(result).toBe('');
    });
});
