import randomPercent from '../../helpers/get-random-percent';

describe('get-random-percent ', () => {
    it('returns some number between given min and max', () => {
        const number = randomPercent(10, 20);
        expect(number).toBeGreaterThanOrEqual(10);
        expect(number).toBeLessThanOrEqual(20);
    });
    it('returns some numer without given min and max and this number is less than 100', () => {
        const number = randomPercent();
        expect(number).toBeLessThanOrEqual(100);
    });
});
