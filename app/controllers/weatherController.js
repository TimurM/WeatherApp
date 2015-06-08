(function() {

    var WeatherController = function ($scope, $routeParams, weatherFactory) {
        $scope.forecast = null;
        $scope.pastWeather = null;

        function init() {
             weatherFactory.getForecast('11372', '5')
                .success(function(forecast) {
                    $scope.forecast = forecast.data.weather;
                    console.log(forecast.data.weather);
                })
                .error(function(data, status, headers, config) {
                    //handle error
                });

             weatherFactory.getPastWeather('94110', '2015-04-10', '2015-05-29')
                .success(function(pastWeather) {
                    $scope.pastWeather = pastWeather;
                    // console.log(pastWeather);
                })
                .error(function(data, status, headers, config) {
                    //handle error
                });
        }

        init();
    };

    WeatherController.$inject = ['$scope', '$routeParams', 'weatherFactory'];

    angular.module('weatherApp')
      .controller('WeatherController', WeatherController);

}());
