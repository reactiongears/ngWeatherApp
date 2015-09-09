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
//                                  Custom Service
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.service('cityNameService', function(){
    this.cityName = '';
});

//------------------------------------------------------------------------------------------------------------------------------------------
//                                  Home Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('homeController', ['$scope', '$log', 'cityNameService', function ($scope, $log, cityNameService) {
    'use strict';
    $log.info("You are on the Home Page");
    
    $scope.$watch('cityName', function () {
        cityNameService.cityName = $scope.cityName;
        $log.info($scope.cityName)
    });
}]);


//------------------------------------------------------------------------------------------------------------------------------------------
//                                 Forcast Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('forecastController', ['$scope', '$log', 'cityNameService', function ($scope, $log, cityNameService) {
    'use strict';
    $log.info("You are on the Forecast Page for city "+cityNameService.cityName);
    $scope.cityName = cityNameService.cityName;
}]);
