(function () {
    'use strict';

    angular.module('myApp.dev')
        .config(configFunction)
        .run(runFunction);

    var config = {
        componentsDir : '/components'
    };

    function configFunction($httpProvider, $provide, mocks) {
        if (!mocks.useMocks) {
            return;
        }

        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

//        var APIUrl = (config.API.protocol + '://' + config.API.host + ':' + mocks.port + config.API.path + '/');
        var APIUrl = 'http:://localhost.ms.com:3000/someapi/myapp'

        $httpProvider.interceptors.push(function ($q, $timeout, $httpBackend) {
            function isApiCall(url){
                if (url.indexOf(".html") === -1 && url.indexOf('/someapi/myapp')>=0) {
                    return true;
                }
                return false;
            }

            function mockGet(url){
                var response = load(getUri(url) + '_GET');
                // check to see if the mock is to be loaded 'response.mock'
                if (response && response.mock){
                    $httpBackend.whenGET(url).respond(function () {
                        var status = response.status || 200;
                        var jsonResponse = response.json || {};
                        return [status, jsonResponse];
                    });
                } else {
                    $httpBackend.whenGET(url).passThrough();
                }
            }

            function mockPost(url){
                var response = load(getUri(url) + '_POST');

                if (response && response.mock){
                    $httpBackend.whenPOST(url).respond(function () {
                        var status = response.status || 200;
                        var jsonResponse = response.json || {};
                        return [status, jsonResponse];
                    });
                } else {
                    $httpBackend.whenPOST(url).passThrough();
                }
            }

            function getUri(url){
                url = stripQueryParams(url);
                return url.substring(15);
            }

            function stripQueryParams(url){
                var indexOfQueryParams = url.indexOf('?');
                if (indexOfQueryParams >= 0) {
                    return url.substring(0,indexOfQueryParams);
                }
                return url;
            }

            function load(path){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', './dev/json/' + path + '.json', false);
                xhr.send();
                if (xhr.status === 200){
                    return angular.fromJson(xhr.response);
                }
                return null;
            }

            function buildFullUrl(config){
                var url = config.url;
                var params = '';
                for (var param in config.params) {
                    var value = config.params[param];
                    params += '&' + param + '=' + value;
                }
                if (params){
                    url += '?' + params.substring(1);
                }
                return url;
            }

            return {
                'request': function (config) {
                    if (isApiCall(config.url)){
                        var url = buildFullUrl(config);
                        if (config.method === "GET") {
                            mockGet(url);
                        } else if (config.method === "POST"){
                            mockPost(url);
                        }
                    }
                    return config;
                },
                'response': function (response) {
                    var deferred = $q.defer();

                    if (response.config.url.indexOf(APIUrl) !== 0) {
                        return response; //Only handle calls to the API
                    }

                    deferred.resolve(response);

                    return deferred.promise;
                }
            };
        });
    }

    function runFunction(mocks, $httpBackend, regexEscape) {
        if (!mocks.useMocks) {
            return;
        }

        function passThrough(url) {
            $httpBackend.whenGET(new RegExp(regexEscape(url))).passThrough();
        }

        passThrough(config.componentsDir);
    }

}());
