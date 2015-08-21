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
                function responseHandler (res) {
                    if (res.data) {
                        resolve(res.data)
                    } else {
                        reject()
                    }
                }
                $http.get('/someapi/myapp/users').then(responseHandler, responseHandler);
            });
        }
    }
}());
