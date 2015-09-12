var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps']);

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
weatherApp.service('cityService', function(){
    this.cityName = 'Los Angeles, CA';
    this.days = 1;
    this.daysLabel = "Today";
});

//------------------------------------------------------------------------------------------------------------------------------------------
//                                  Home Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('homeController', ['$scope', '$log', '$resource', 'cityService', function ($scope, $log, $resource, cityService) {
    'use strict';
    $log.info("You are on the Home Page");
    
    $scope.validCity = false;
    $scope.days = cityService.days;
    $scope.daysLabel = cityService.daysLabel;
    $scope.$watch('daysLabel');
    
    $scope.setDays = function(count, label){
        $scope.days = cityService.days = count;
        $scope.daysLabel = cityService.daysLabel = label;
    }
    
    $scope.$watch('cityName', function () {
        
        cityService.cityName = $scope.cityName;
        $log.info($scope.cityName);
        
        if(cityService.cityName != undefined){
            $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback:"JSON_CALLBACK"}, { get:{ method: "JSONP" }});
            $scope.weatherResult = $scope.weatherApi.get({q:$scope.cityName, cnt:cityService.days});
            if($scope.weatherResult != undefined){
                $scope.validCity = true;   
            }
        }
    });
    
}]);


//------------------------------------------------------------------------------------------------------------------------------------------
//                                 Forcast Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('forecastController', ['$scope', '$log', '$resource', '$filter', 'cityService', function ($scope, $log, $resource, $filter, cityService) {
    'use strict';
    $scope.cityName = cityService.cityName;
    $scope.days = 1;
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback:"JSON_CALLBACK"}, { get:{ method: "JSONP" }});
    $scope.weatherResult = $scope.weatherApi.get({q:$scope.cityName, cnt:2});
    
    $scope.weatherResult.$promise.then(function(resp){
        $scope.cityCoords = resp["city"]["coord"];
        $scope.map = { center: { latitude: $scope.cityCoords.lat, longitude: $scope.cityCoords.lon }, zoom: 12 };
    });
    
    // - Utils Methods
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    
    $scope.convertToDate = function(dt){
        return $filter('date')(new Date(dt * 1000), 'EEEE, MMMM d, y');
    };
    
     $scope.$watch('cityName', function () {
        cityService.cityName = $scope.cityName;
        $scope.weatherResult = $scope.weatherApi.get({q:$scope.cityName, cnt:$scope.days});
         
        $scope.weatherResult.$promise.then(function(resp){
            $log.info(resp["city"]["coord"]);
            $scope.cityCoords = resp["city"]["coord"];
            $scope.map = { center: { latitude: $scope.cityCoords.lat, longitude: $scope.cityCoords.lon }, zoom: 12 };
        });
    });
    
}]);
