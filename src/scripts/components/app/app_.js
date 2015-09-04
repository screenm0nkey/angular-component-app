(function () {
    'use strict';

    angular.module('myApp.components.app')
        .controller('appComponentCtrl', controllerFunction)
        .component('app', componentFunction);


    function controllerFunction($scope, $element, UserModel) {
        var vm = this;

        vm.bindValue = "someval";
        // this is coming from the mocks
        UserModel.getUsers().then(function(data){
            vm.users = data;
        });
        // this is coming from the api
        UserModel.getMessage().then(function(data){
            vm.message = data;
        });
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
        // the return value overrides DDO values set in the component-factory
        return {
            //templateUrl: "sausage/components/app/app.html",
            link: function (scope, el, attrs) {
                var vm = scope.vm;

                vm.someMethod = someMethod;

                function someMethod(val) {
                    alert(val);
                }
            }
        };
    }
}());


