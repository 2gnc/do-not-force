import * as Chance from 'chance';

export default function(min?: number, max?: number): number {
    const chance = new Chance();
    return chance.integer({ min: min || 0, max: max || 100 });
}
