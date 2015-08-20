'use strict';

beforeEach(function() {
    jasmine.addMatchers({
        toBeFunction: function() {
            return {
                compare: function (actual) {
                    var passed = typeof actual === 'function';

                    return {
                        pass: passed,
                        message: 'Expected ' + actual + ' to be Function '
                    };
                }
            };
        }
    });
});