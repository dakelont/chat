'use strict';

angular.module('myApp.myaccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myaccount', {
    templateUrl: 'myaccount/myaccount.html',
    controller: 'myaccountCtrl'
  });
}])

.controller('myaccountCtrl', function($scope) {

})
