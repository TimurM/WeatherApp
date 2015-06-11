(function() {

    var app = angular.module('weatherApp', ['ngRoute', 'chart.js']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'WeatherController',
                templateUrl: 'app/views/weather.html'
            })
            .otherwise( { redirectTo: '/' } );
    });

}());
