(function() {

    var WeatherController = function ($scope, $window, weatherFactory) {

        $scope.tempArray = [];
        $scope.tempDates = [];
        $scope.precipMM = [];
        $scope.location = null;
        $scope.currentWeather = null;
        $scope.historyToggle = false;
        $scope.precentSunnyDays = null;

        $scope.expand = function() {
          $scope.historyToggle = !$scope.historyToggle;
        }

        function init() {
                $window.onload = function() {
                  var geoSuccess = function(position) {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    $scope.location = [lat, lon].join(",");
                    $scope.search($scope.location);
                  };
                  var geoError = function(position) {
                    alert('Error occurred. Error code: ' + error.code);
                  };
                  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
                };
        }

        init();

        $scope.search = function(location) {
          var location = location || $scope.location;

          weatherFactory.getForecast(location, '20')
             .success(function(forecast) {
               $scope.currentWeather = forecast.data.current_condition[0];
               parseWeatherData(forecast)
             })
             .error(function(data, status, headers, config) {
                alert("Encountered an error while fetching the forecast");
             });
        };

        $scope.pastWeather = function(weather) {
          var start_date = moment(weather.start_date).format("YYYY-MM-DD");
          var end_date = moment(weather.end_date).format("YYYY-MM-DD");
          var location = weather.location || $scope.location;

          weatherFactory.getPastWeather(location, start_date, end_date)
             .success(function(pastWeather) {
               parseWeatherData(pastWeather);
             })
             .error(function(data, status, headers, config) {
               alert("Encountered an error while fetching the historical weather");
             });
        };

        function parseWeatherData(object) {
          resetScope();
          var totalDays = object.data.weather.length;
          var rainDays = 0;

          object.data.weather.forEach(function(day) {
            $scope.tempArray.push(day.maxtempF);
            $scope.tempDates.push(day.date);
            $scope.precipMM.push(day.hourly[0].precipMM);

            if (parseInt(day.hourly[0].precipMM) > 2) {
             rainDays += 1
            }
          })
          $scope.precentSunnyDays = Math.round((totalDays - rainDays) / totalDays * 100);
        };

        function resetScope() {
          $scope.tempArray.length = 0;
          $scope.tempDates.length = 0;
          $scope.precipMM.length = 0;
        };


        $scope.labels = $scope.tempDates;
        $scope.series = ['Max Temp', 'Precipitation in mm'];
        $scope.data = [
          $scope.tempArray,
          $scope.precipMM
        ];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
    };

    WeatherController.$inject = ['$scope', '$window', 'weatherFactory'];

    angular.module('weatherApp')
      .controller('WeatherController', WeatherController);

}());
