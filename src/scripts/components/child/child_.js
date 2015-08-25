(function () {
    'use strict';

    angular.module('myApp.components.child')
        .controller('childComponentCtrl', controllerFunction)
        .component('child', componentFunction);


    function controllerFunction($scope) {

    }


    function componentFunction($rootScope) {
        return {
            // 'bindToController:true' should go in the component factory as one of the DDO defaults
            bindToController : true, // this binds the scope properties to the controller i.e. scope.vm.bindValue
            scope: {
                parentMethod : '&',
                bindValue : '='
            },
            link: function (scope, el, attrs) {

            }
        };
    }
}());


