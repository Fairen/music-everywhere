'use strict';

angular.module('MusicIsEverywhereApp')
  .controller('HomeCtrl', function ($scope,$rootScope) {
  	
  	$scope.current_menu.home ='active';
    $scope.current_menu.music ='';
    $scope.current_menu.video ='';
  	
  });
