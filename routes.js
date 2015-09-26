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