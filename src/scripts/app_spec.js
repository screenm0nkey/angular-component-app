'use strict';

describe('app bootstrap file', function () {
    it('should have jasmine "toHaveClass" matcher loaded', function () {
        var ex = expect('');
        expect(typeof ex.toHaveClass).toBe('function');
    });
});
