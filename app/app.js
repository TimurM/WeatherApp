(function() {

    var app = angular.module('weatherApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'WeatherController',
                templateUrl: 'app/views/weather.html'
            })
            .when('/forecast', {
                controller: 'forecastController',
                templateUrl: 'app/views/forecast.html'
            })
            .when('/past-weather', {
                controller: 'pastWeatherController',
                templateUrl: 'app/views/pastWeather.html'
            })
            .otherwise( { redirectTo: '/' } );
    });

}());
