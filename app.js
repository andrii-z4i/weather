var weatherApp = angular.module('weatherApp', []);

weatherApp.config(function(){
    return {
        apiUrl: 'https://api.forecast.io/forecast/',
        apiAppId: '74eee671c24e24a04f85929168194a9e'
    }
});

weatherApp.controller('WeatherController', ['$scope', '$http', function($scope, $http){
   $scope.name = "WeatherApp"; 

   $scope.currentCity = "Pargue";

   $scope.cityList = [];

   $scope.currentTemprature = "0";

   $scope.loadWeather = function() {

   };

   $scope.loadCityList = function() {

   };

}]);