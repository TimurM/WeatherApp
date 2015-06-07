(function() {
    var weatherFactory = function($http) {
        var req = {
          method: 'GET',
          url: 'http://example.com'
        };

        var factory = {};

        factory.getForecast = function(location, num_days){
            return $http.get('http://api.worldweatheronline.com/free/v2/weather.ashx?key=9d5e8176302f25e92b3a5f4780f01&q='
            + location
            + '&num_of_days='
            + num_days
            + '&format=json');
        };

        factory.getPastWeather = function(location, start_date, end_date){
            return $http.get('https://api.worldweatheronline.com/free/v2/past-weather.ashx?key=9d5e8176302f25e92b3a5f4780f01&q='
            + location
            + '&date='
            + start_date
            + '&enddate='
            + end_date
            + '&format=json');
        };

        return factory;
    };

    weatherFactory.$inject = ['$http'];

    angular.module('weatherApp').factory('weatherFactory',
                                           weatherFactory);

}());
