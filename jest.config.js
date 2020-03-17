module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    testRegex: '/__tests__/.*\\.test\\.(ts|js)$',
};
