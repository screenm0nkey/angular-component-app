'use strict';

describe('Component: appComponent', function () {
    // we dont have to load all modules as we're loading them in app.js
    // i.e. angular.module('myApp.models', []);
    beforeEach(function () {
        module('myApp');
        module("myApp.templates");
    });


    describe('Link: appComponent', function () {
        var scope, $compile, $httpBackend, element;

        beforeEach(function () {
            inject(function ($rootScope, _$compile_, _$httpBackend_) {
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                $compile = _$compile_;
                element = angular.element('<app-component></app-component>');
                element = $compile(element)(scope);
                $httpBackend.when('GET', '/someapi/myapp/users').respond({});
                $httpBackend.flush();
                scope.$digest();
                // assign the isolate scope
                scope = element.find(':first').scope();
            });
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have the component class', function () {
            expect(element).toHaveClass('app-component');
        });

        it('should have a method', function () {
            expect(scope.vm.someMethod).toBeFunction();
        });
    });


    describe('Controller: app-component', function () {
        var Ctrl, scope, element;

        beforeEach(function () {
            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<app-component></app-component>');
                Ctrl = $controller('appComponentCtrl as vm', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        describe('Something', function () {
            it('should be', function () {
                expect(scope.vm === Ctrl).toBeTruthy();
                expect(Ctrl.bindValue).toBe("someval");
            });
        });
    });
});
