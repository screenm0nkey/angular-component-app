'use strict';

beforeEach(function() {
    jasmine.addMatchers({
        toHaveClass: function() {
            return {
                compare: function (actual, expected) {
                    var passed = actual.hasClass(expected);

                    return {
                        pass: passed,
                        message: 'Expected ' + actual + ' to have class ' + expected
                    };
                }
            };
        }
    });
});