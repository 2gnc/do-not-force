export enum Figures {
    TRIANGLE,
    // CIRCLE,
    // ELLIPSE,
    // RECTANGLE,
}

export interface FigureParams {
    color: string;
    figure: Figures;
    coordinates: FigureCoorginates;
    rotation: number;
}

export interface SceneParams {
    background: FigureParams;
    foreground: FigureParams;
    textColor: string;
}

export type FigureCoorginates = string[];
