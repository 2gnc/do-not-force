import * as Chance from 'chance';
import { doRequest } from '../helpers/do-request';

export async function getColorPalette(color?: string): Promise<Record<string, string>> {
    const isColorCorrect = /^#[a-z0-9]{6}$/.test(color);

    if (!isColorCorrect) {
        color = new Chance().color({ format: 'rgb' });
    }
    const COLOR_API_URL = `https://www.thecolorapi.com/scheme?hex=${color.replace(
        '#',
        '',
    )}&mode=triad&count=3&format=json`;
    const raw = await doRequest(COLOR_API_URL, {
        origin: 'do-not-force-bot',
        gotOptions: {},
    });
    const parsed = JSON.parse(raw.body);
    return {
        background: parsed.colors[0].rgb.value,
        foreground: parsed.colors[2].rgb.value,
        textColor: parsed.colors[0].contrast.value,
    };
}
