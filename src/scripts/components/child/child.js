(function () {
    'use strict';

    angular.module('myApp.components.child')
        .controller('childComponentCtrl', controllerFunction)
        .component('child', componentFunction);


    function controllerFunction($scope) {
        debugger
    }


    function componentFunction($rootScope) {
        return {
            scope: {
                bindValue : '='
            },
            link: function (scope, el, attrs) {
                debugger
                console.log('child link function', $rootScope);
            }
        };
    }
}());


