import { FigureParams, Figures } from '../@types/common';

export default function(figure: FigureParams): string {
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
