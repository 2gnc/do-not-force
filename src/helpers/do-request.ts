import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import got, { GotOptions } from 'got';
import * as qs from 'qs';

const httpAgent = new HttpAgent({ keepAlive: true });
const httpsAgent = new HttpsAgent({ keepAlive: true });

export interface RequestParams {
    origin: string;
    gotOptions: GotOptions;
    qsOptions?: qs.IStringifyOptions;
    query?: Record<string, any>;
}

const REQUEST_PARAMS = {
    timeout: 4000,
    retry: { retries: 0 },
};

function getErrorBody(error: any): string {
    if (error.response && error.response.body) {
        return ` (message: ${JSON.stringify(error.response.body)}))`;
    }

    return '';
}

export async function doRequest(
    url: string,
    { gotOptions, origin: originalUrl, qsOptions }: RequestParams,
): Promise<any> {
    const method = gotOptions.method || 'GET';
    const params = qs.stringify(qsOptions) && `?${qs.stringify(qsOptions)}`;
    let logMessage = `${originalUrl} => ${method.toUpperCase()} => ${url}${params}`;

    if (gotOptions.headers) {
        logMessage += ` => (headers: ${JSON.stringify(gotOptions.headers)})`;
    }

    if (gotOptions.body) {
        logMessage += ` => (body: ${JSON.stringify(gotOptions.body)})`;
    }

    try {
        const options = {
            ...REQUEST_PARAMS,
            ...gotOptions,
            headers: {
                ...gotOptions.headers,
            },
            agent: {
                http: httpAgent,
                https: httpsAgent,
            },
        };
        const response = await got(url, options as any);

        logMessage += ` => ${response.statusCode}`;

        if (gotOptions.json) {
            logMessage += ` => ${JSON.stringify(response.body)}`;
        }

        console.info(logMessage);
        return response;
    } catch (error) {
        console.error(`${logMessage} => ${error.statusCode || error.code}${getErrorBody(error)}`);
        throw error;
    }
}
