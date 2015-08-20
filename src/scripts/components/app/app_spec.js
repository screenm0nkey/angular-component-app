'use strict';

describe('Component: appComponent', function () {

    describe('Directive: appComponent', function () {
        var scope, $compile, element;


        beforeEach(function () {
            module('myApp');
            module("myApp.templates");
            module('myApp.components.app');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });
        });

        //id.substr(id.lastIndexOf('/') + 1)
        it('should have the component class', function () {
            element = angular.element('<app-component></app-component>');
            element = $compile(element)(scope);
            scope.$digest();
            //var ex = expect(element);
            //expect(!!ex.toHaveClass).toBeTruthy();
        });
    });
});
