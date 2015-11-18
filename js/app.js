/* global Skycons */
var weatherApp = angular.module('weatherApp', ['ngResource', 'ngAnimate', 'ui.bootstrap']);

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
            $scope.cityList = [];
        });
    };

    $scope.loadCityList = function(cityToSearch) {
        $scope.cityRequest.get({cityName: cityToSearch}, function(cities){
            $scope.forecast = null;
            if (cities.results !== undefined) {
                $scope.cityList = cities.results;
            }
            else {
                $scope.cityList = [];
            }
        });
    };

}]);

weatherApp.filter('icon', function(){
    return function(input, icon_id) {
        // canvas
        var skycons = new Skycons({"color": "gray"});
        // on Android, a nasty hack is needed: {"resizeClear": true}
        var skycons_id = input;
        console.log(icon_id + ' ' + Date.now());
        skycons.add(icon_id, skycons_id);
        skycons.play(); 
    }
});

weatherApp.filter('km_h', function(){
    return function(input){
       return Math.round(input * 3.6);
    }
});

weatherApp.filter('temperature', function(){
    return function(input, toSystem){
        if (toSystem === 'celsium') {
            return Math.round((input - 32) / 1.8);
        }
        return input;
    }
});

weatherApp.directive('hourlyBlock', function(){
    return {
        templateUrl: 'templates/directives/weather-block.html',
        scope: {
            weather: '=info',
            blockIndex: '@blockIndex'
        }
    }
});

weatherApp.directive('dailyBlock', function(){
    return {
        templateUrl: 'templates/directives/weather-block-daily.html',
        scope: {
            weather: '=info',
            blockIndex: '@blockIndex'
        }
    }
});
