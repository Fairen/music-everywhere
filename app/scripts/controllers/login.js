'use strict';

angular.module('MusicIsEverywhereApp').controller('LoginCtrl', function ($scope,Authentication,$location) {

	$scope.current_menu.home ='';
    $scope.current_menu.music ='';
    $scope.current_menu.video ='';

	$scope.submit = function(){
		Authentication.signIn($scope.username,$scope.password);
	};

});