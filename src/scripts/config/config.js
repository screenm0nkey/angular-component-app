/**
 * configuration file for the app
 */
(function () {
    'use strict';

    angular.module('myApp')
        .config(envConfigFunction);

    function envConfigFunction(componentFactoryProvider) {
        componentFactoryProvider.setViewPath('scripts/components/');
    }
}());

