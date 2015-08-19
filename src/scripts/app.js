(function () {
    'use strict';

    var app = angular.module('myApp', [
        'cmelion.componentFactory',
        'myApp.componentLoader'
    ]);

    angular.componentFactory.moduleDecorator(app);
}());

