'use strict';

angular.module('MusicIsEverywhereApp').controller('IndexCtrl', function ($scope,$rootScope,$route,Authentication,$location,$timeout) {
    
    $scope.current_menu = {'home':'','music':'','video':''};

    $scope.player = {'current_music':{'name':'','dir':''},'playlist':''};

    //TODO : Find a way to do it the AngularJs way, ng-src doesn't work 
	$scope.play = function(){
        if($scope.player.current_music.play){
            $scope.player.current_music.play = false;
            $("#audio_player")[0].pause();
        }else{
            $scope.player.current_music.play = true;
    		$("#audio_player").attr('src',"http://172.20.0.140:9001/server/music"+$scope.player.current_music.dir+""+$scope.player.current_music.name);
            $("#audio_player").load;
        }
	};


    $scope.updatePlayer = function(file){
        $scope.player.current_music.name = file.name;
	    $scope.player.current_music.dir = file.dir;
	    $scope.player.current_music.isDirectory = file.isDirectory;
	    $scope.player.current_music.play = false;
	    $scope.play();
    }

    $rootScope.$on('$routeChangeSuccess',function(current){
        if($route.current.auth && !Authentication.isSignedIn()){
            $location.url("/login");
        }
    });

    // $scope.backgroundChange_timeout = null;
    // $scope.backgroundChange_index = 1;

    // $scope.backgroundChange = function(){
    //     if($scope.backgroundChange_index==6){
    //         $scope.backgroundChange_index = 1;
    //     }else{
    //         $scope.backgroundChange_index++;
    //     }
    //     $("body").css("background-image","url(../images/bg"+$scope.backgroundChange_index+".jpg)");
    //     $scope.backgroundChange_timeout = $timeout($scope.backgroundChange,60000);
    // };

    // $scope.backgroundChange();
    
  });