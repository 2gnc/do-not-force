jest.mock('got');
import got from 'got';
import { doRequest } from '../../helpers/do-request';

const mockedGot = got as unknown;

beforeEach(() => {
    jest.spyOn(global.console, 'info');
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('do-request ', () => {
    it(' calls got once', async () => {
        (mockedGot as jest.Mock).mockReturnValue(Promise.resolve('test'));
        await doRequest('https://test.ru', {
            gotOptions: {},
            origin: 'test',
        });
        expect(got).toHaveBeenCalledTimes(1);
        expect(global.console.info).toHaveBeenCalledTimes(1);
    });
    it(' returns returns value of async request', async () => {
        (mockedGot as jest.Mock).mockReturnValue(Promise.resolve('test'));
        const response = await doRequest('https://test.ru', {
            gotOptions: {},
            origin: 'test',
        });
        expect(response).toBe('test');
    });
    it(' runs console.info', async () => {
        (mockedGot as jest.Mock).mockReturnValue(Promise.resolve('test'));
        await doRequest('https://test.ru', {
            gotOptions: {},
            origin: 'test',
        });
        expect(global.console.info).toHaveBeenCalledTimes(1);
        expect(global.console.info).toHaveBeenCalledWith('test => GET => https://test.ru => undefined');
    });
    it(' logs error message in case of error', async () => {
        jest.spyOn(global.console, 'error');
        (mockedGot as jest.Mock).mockImplementation(() => {
            throw 'error';
        });
        async function testing(): Promise<void> {
            await doRequest('https://test.ru', {
                gotOptions: {},
                origin: 'test',
            });
        }
        try {
            expect(testing()).toThrow();
        } catch (e) {
            expect(global.console.error).toHaveBeenCalledTimes(1);
        }
    });
});
