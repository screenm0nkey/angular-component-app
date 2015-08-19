(function () {
    'use strict';

    /*
    * This file can be generated on using a custom grunt task by
    * Looping through components and read the module names
    * */

    var components;

    components = angular.module('myApp.components.app', []);
    angular.componentFactory.moduleDecorator(components);

    components = angular.module('myApp.components.child', []);
    angular.componentFactory.moduleDecorator(components);

    angular.module('myApp.componentLoader', [
        'myApp.components.app',
        'myApp.components.child'
    ]);
}());