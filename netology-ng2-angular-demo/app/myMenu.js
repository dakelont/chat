'use strict';
angular.module('myMenu', [])
.controller('myMenuCtrl', function ($scope, $location) {
    $scope.menu = [
		{
			'id':'view1'
		},
		{
			'id':'view2'
		},
		{
			'id':'myaccount'
		}
	];
	
	$scope.isActive = function(location) {
		return '/' + location === $location.path()
	}

});