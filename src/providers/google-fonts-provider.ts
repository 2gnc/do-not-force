import * as Chance from 'chance';
import { FontPrepared, FontRaw } from '../@types/common';
import { doRequest } from '../lib/do-request';

export class Fonts {
    private _fontURLBase = 'https://fonts.googleapis.com/css?family=';
    private _googleApiURL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`;
    _fonts: FontPrepared[] = [];

    public initialize = async (): Promise<void> => {
        try {
            const fonts = await doRequest(this._googleApiURL, {
                origin: 'do-not-force-bot',
                gotOptions: {},
            });
            const fontsCyr: FontRaw[] = JSON.parse(fonts.body).items.filter((font: Record<string, any>) => {
                return font.subsets.includes('cyrillic') && font.category !== 'serif';
            });
            fontsCyr.forEach((font: FontRaw) => {
                if (!font.family) {
                    return;
                }
                this._fonts.push({
                    name: font.family,
                    url: encodeURI(`${this._fontURLBase}${font.family}`),
                });
            }, this);
        } catch (e) {
            console.log(e);
        }
    };
    get fonts(): FontPrepared[] {
        return this._fonts;
    }
    get randomFont(): FontPrepared {
        const chance = new Chance();
        const rNum = chance.integer({ min: 0, max: this._fonts.length });
        return this._fonts[rNum];
    }
}
