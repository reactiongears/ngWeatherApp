//------------------------------------------------------------------------------------------------------------------------------------------
//                                  Custom Services
//------------------------------------------------------------------------------------------------------------------------------------------
weatherApp.service('cityService', function () {
    'use strict';
    this.cityName = 'Los Angeles, CA';
    this.days = 1;
    this.daysLabel = "Today";
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    'use strict';
    this.GetWeather = function (cityName, days) {
        var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});
        return weatherApi.get({q: cityName, cnt: days});
    };
}]);
