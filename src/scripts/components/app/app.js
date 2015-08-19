(function () {
    'use strict';

    angular.module('myApp.components.app')
        .controller('appComponentCtrl', controllerFunction)
        .component('app', componentFunction);


    function controllerFunction($scope) {
        var vm = this;

        vm.bindValue = "someval"
    }

    /*
         This is the default DDO Directive Description Object created by component-factory
         {
             componentSnakeName: "app"
             controller: "appComponentCtrl"
             controllerAs: "vm"
             replace: true
             restrict: "E"
             scope: {},
             templateUrl: "scripts/components/app/app.html"
         }
    */

    // the componentFunction is the directive.
    function componentFunction($rootScope) {
        // override DDO values set in the component-factory
        return {
           link : function (scope, el, attrs) {
               var vm = scope.vm;
               vm.valueForChildTwo = "Two"
           }
        };
    }
}());


