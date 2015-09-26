//------------------------------------------------------------------------------------------------------------------------------------------
//                                  Home Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('homeController', ['$scope', '$log', '$location', 'weatherService', 'cityService', function ($scope, $log, $location, weatherService, cityService) {
    'use strict';
    $log.info("You are on the Home Page");
    
    $scope.validCity = false;
    $scope.days = cityService.days;
    $scope.daysLabel = cityService.daysLabel;
    $scope.$watch('daysLabel');
    
    $scope.setDays = function (count, label) {
        $scope.days = cityService.days = count;
        $scope.daysLabel = cityService.daysLabel = label;
    };
    
    $scope.$watch('cityName', function () {
        
        cityService.cityName = $scope.cityName;
        
        if (cityService.cityName != undefined) {
            
            $scope.weatherResult = weatherService.GetWeather($scope.cityName, cityService.days);
            $scope.weatherResult.$promise.then(function (resp) {
                $log.info(resp['city']['name'][0]);
                $log.info($scope.cityName[0]);
                if ($scope.weatherResult != undefined && resp['city']['name'][0] == $scope.cityName[0]) {
                    $scope.validCity = true;
                }else{
                    $scope.validCity = false;
                    $scope.weatherResult = null;
                }
                
            });
            
        }
    });
    
    $scope.submit = function(){ 
        if ($scope.validCity) {
            $location.path("/forecast");
        }
    };
    
}]);


//------------------------------------------------------------------------------------------------------------------------------------------
//                                 Forcast Page Controller
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.controller('forecastController', ['$scope', '$log', 'weatherService', '$filter', 'cityService', function ($scope, $log, weatherService, $filter, cityService) {
    'use strict';
    $scope.cityName = cityService.cityName;
    $scope.days = cityService.days;
    $scope.daysLabel = cityService.daysLabel;
    $scope.$watch('daysLabel');
    
    $scope.setDays = function (count, label) {
        $scope.days = cityService.days = count;
        $scope.daysLabel = cityService.daysLabel = label;
        $scope.weatherResult = weatherService.GetWeather($scope.cityName, cityService.days);
    };
    
    $scope.weatherResult = weatherService.GetWeather($scope.cityName, cityService.days);
    
    $scope.weatherResult.$promise.then(function (resp) {
        $scope.cityCoords = resp['city']['coord'];
        $scope.map = { center: { latitude: $scope.cityCoords.lat, longitude: $scope.cityCoords.lon }, zoom: 12 };
    });
    
    // - Utils Methods
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    
    $scope.convertToDate = function (dt) {
        //return $filter('date')(new Date(dt * 1000), 'EEEE, MMMM d, y');
        return new Date(dt * 1000);
    };
    
    $scope.$watch('cityName', function () {
        cityService.cityName = $scope.cityName;
        $scope.weatherResult = weatherService.GetWeather($scope.cityName, cityService.days);
         
        $scope.weatherResult.$promise.then(function (resp) {
            $log.info(resp["city"]["coord"]);
            $scope.cityCoords = resp["city"]["coord"];
            $scope.map = { center: { latitude: $scope.cityCoords.lat, longitude: $scope.cityCoords.lon }, zoom: 12 };
            $scope.mapOption = {disableDefaultUI    :true,
                                draggable           :false,
                                scrollwheel         :false,
                                mapTypeId           :google.maps.MapTypeId.TERRAIN}
            
            
            //var marker = new google.maps.Marker({position:{ latitude: $scope.cityCoords.lat, longitude: $scope.cityCoords.lon }});
            //marker.setMap($scope.map);
        });
    });
    
}]);