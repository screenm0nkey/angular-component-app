(function () {
    'use strict';

    var app = angular.module('myApp', [
        'cmelion.componentFactory',
        'myApp.componentLoader',
        'myApp.models'
    ]);

    angular.module('myApp.models', []);

    angular.componentFactory.moduleDecorator(app);
}());

