jest.mock('../../../helpers/do-request');
import { colorApiResponse } from '../../fixtures/color-api-response';
import { getColorPalette } from '../../../providers/color-provider';
import { doRequest } from '../../../../src/helpers/do-request';

(doRequest as jest.Mock).mockReturnValue(Promise.resolve(colorApiResponse));

describe('getColorPalette ', () => {
    it(' returns result if no arguments was passed', async () => {
        const result = await getColorPalette();
        expect(result);
    });
    it(' returns result if argument was invalid', async () => {
        const result = await getColorPalette('bla-bla-bla');
        expect(result);
    });
    it(' returns result if argument was valid', async () => {
        const result = await getColorPalette('c21325');
        expect(result);
    });
});
