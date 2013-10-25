'use strict';

angular.module('MusicIsEverywhereApp', ["ngResource","MusicIsEverywhereAppDirectives"])
  .factory('MusicDir', function ($resource) {  
    return $resource('http://172.20.0.140\\:9001/view/music/:current_dir');
  }) 
  .factory('Authentication', function ($resource,$http,$location){
    var isLogged = false;
    return {

      signIn: function(username,password) {
        $http.post("http://172.20.0.140:9001/login",{username:username, password:password})
        .success(function(data){
            isLogged = (data.status == 'ok') 
            $location.url("/home")
        });
      },

      signOut: function() {
        isLogged = false;
      },

      isSignedIn: function() {
        return isLogged;
      }
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        auth:true,
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).when('/music', {
        auth:true,
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      }).when('/login', {
        auth:false,
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
