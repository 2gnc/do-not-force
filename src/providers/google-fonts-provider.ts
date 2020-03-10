import * as Chance from 'chance';
import { doRequest } from '../lib/do-request';

export async function getRandomFont(): Promise<{ name: string; url: string }> {
    const fontURLBase = 'https://fonts.googleapis.com/css?family=';
    const googleApiURL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`;
    const chance = new Chance();
    try {
        const fonts = await doRequest(googleApiURL, {
            origin: 'do-not-force-bot',
            gotOptions: {},
        });
        const fontsCyrillic = JSON.parse(fonts.body).items.filter((font: Record<string, any>) => {
            return font.subsets.includes('cyrillic');
        });
        const pickedFontNumber = chance.integer({ min: 0, max: fontsCyrillic.length });
        return {
            name: fontsCyrillic[pickedFontNumber].family,
            url: `${fontURLBase}${fontsCyrillic[pickedFontNumber].family}`,
        };
    } catch (err) {
        console.log('Error in random font', err);
        return {
            name: 'Roboto',
            url: `${fontURLBase}Roboto`,
        };
    }
}
