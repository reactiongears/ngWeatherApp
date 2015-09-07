var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//------------------------------------------------------------------------------------------------------------------------------------------
//                                  SPA Route Provider
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
    
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });
});

//------------------------------------------------------------------------------------------------------------------------------------------
//                                  Home Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('homeController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info("You are on the Home Page");
}]);


//------------------------------------------------------------------------------------------------------------------------------------------
//                                 Forcast Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('forecastController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info("You are on the Forecast Page");
}]);
