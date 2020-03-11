import * as Chance from 'chance';
import { doRequest } from '../lib/do-request';

export async function getColorPalette(color?: string): Promise<Record<string, string>> {
    const isColorCorrect = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/.test(color ? color.replace(' ', '') : '');
    if (!isColorCorrect) {
        color = new Chance().color({ format: 'rgb' });
    }
    const COLOR_API_URL = `https://www.thecolorapi.com/scheme?rgb=${color}&mode=triad&count=3&format=json`;
    const raw = await doRequest(COLOR_API_URL, {
        origin: 'do-not-force-bot',
        gotOptions: {},
    });
    const parsed = JSON.parse(raw.body);
    return {
        background: parsed.colors[0].rgb.value,
        foreground: parsed.colors[1].rgb.value,
        textColor: parsed.colors[0].contrast.value,
    };
}
