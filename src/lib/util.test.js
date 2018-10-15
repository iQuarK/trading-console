const util = require('./util');

describe('Util library', () => {
    describe('A sample function', () => {
        test('should return true', () => {
            expect(util.sampleFunction()).toBe(true);
        });
    });
});