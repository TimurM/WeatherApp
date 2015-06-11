(function() {
    var currentWeather = function () {
      return {
        scope: {
          datasource: "="
        },
        templateUrl: 'app/views/currentWeather.html'
      }
    };

    angular.module("weatherApp")
      .directive('currentWeather', currentWeather);
}());
