(function () {
    'use strict';

    angular.module('myApp.models', []);
    angular.module('myApp.dev', []);

    var app = angular.module('myApp', [
        'myApp.componentLoader',
        'myApp.models',
        'myApp.dev',
        'cmelion.componentFactory',
        'ngSymbiosis.utils'
    ]);

    angular.componentFactory.moduleDecorator(app);
}());

