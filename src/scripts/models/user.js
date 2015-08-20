(function () {
    'use strict';

    angular.module('myApp.models')
        .factory('UserModel', factoryFunction);

    function factoryFunction($http, $q) {
        return {
            getUsers: getUsers
        };

        function getUsers(params) {
            return $q(function(resolve, reject){
                $http.get('/myapp/users').then(resolve, reject);
            });
        }
    }
}());
