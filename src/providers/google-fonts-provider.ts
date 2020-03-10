import { doRequest } from '../lib/do-request';

export async function getRandomFont(): Promise<string> {
    const fontURLBase = 'https://fonts.googleapis.com/css?family=';
    const googleApiURL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`;
    try {
        // const fonts = await got(googleApiURL, {});
    } catch (err) {
        console.log('Error in random font', err);
        return `${fontURLBase}Roboto`;
    }
}
