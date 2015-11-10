var weatherApp = angular.module('weatherApp', ['ngResource']);

weatherApp.controller('WeatherController', ['$scope', '$http', '$resource', function($scope, $http, $resource){
    $scope.name = "WeatherApp"; 

    $scope.currentCity = "Prague";

    $scope.cityList = [];

    $scope.forecast = null;

    $scope.cityRequest = $resource('http://127.0.0.1:8081/city/:cityName', {cityName: '@cityName'});

    $scope.forecastRequest = $resource('http://127.0.0.1:8081/forecast/:attitude/:latitude', {attitude: '@attitude', latitude: '@latitude'});

    $scope.loadWeather = function(cityObject) {
        $scope.forecastRequest.get({attitude: cityObject.attitude, latitude: cityObject.latitude}, function(forecast){
            $scope.forecast = forecast;
        });
    };

    $scope.loadCityList = function(cityToSearch) {
        $scope.cityRequest.get({cityName: cityToSearch}, function(cities){
            if (cities.results !== undefined) {
                $scope.cityList = cities.results;
            }
            else {
                $scope.cityList = [];
            }
        });
    };


}]);