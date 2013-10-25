'use strict';

angular.module('MusicIsEverywhereApp')
  .controller('MusicCtrl', function ($scope, MusicDir) {

        $scope.current_menu.home ='';
        $scope.current_menu.video ='';
        $scope.current_menu.music ='active';

    	$scope.current_dir = [{url:"/"}];
        $scope.orderby = '-isDirectory';

        $scope.orderByIcon = function(){
            return ($scope.orderby=='-isDirectory')?'icon-sort-down':'icon-sort-up';
        }

        $scope.changeOrder = function(){
            $scope.orderby = ($scope.orderby=='-isDirectory')?'isDirectory':'-isDirectory';
        }

        $scope.concatDirectories = function(directories){
            var res = "";
            for (var i = 0; i < directories.length; i++) {
                res+=directories[i].url;
            }
            return res;
        };

	    $scope.current_files = MusicDir.query({current_dir:$scope.concatDirectories($scope.current_dir)});

    	$scope.isDirectory = function(file){
    		return (file.isDirectory)?"icon-folder-close-alt orange":"icon-music orange";
    	};

        $scope.currentlyPlay = function(file){
            return (file.name == $scope.player.current_music.name);
        }


        $scope.showControl = function(file){
            return ($scope.currentlyPlay(file))?"icon-pause orange":"icon-play";
        };

        $scope.openFile = function(file){
            if(file.isDirectory){
                $scope.current_dir.push({url:file.name+"/"});
            }else{
                $scope.updatePlayer(file);
                $scope.player.playlist = $scope.current_files;
            }
        };

        $scope.updatePath = function(i){
            $scope.current_dir = $scope.current_dir.slice(0,i+1);
        }

        $scope.$watch('current_dir',function(scope,current,previous){
            $scope.current_files = MusicDir.query({current_dir:$scope.concatDirectories($scope.current_dir)});
        },true);

  });