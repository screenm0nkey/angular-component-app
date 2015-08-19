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
                parentMethod : '&',
                bindValue : '='
            },
            link: function (scope, el, attrs) {
                console.log('child link function', $rootScope);
            }
        };
    }
}());


