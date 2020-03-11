import * as Chance from 'chance';

export default function(): number {
    const chance = new Chance();
    return chance.integer({ min: 0, max: 100 });
}
