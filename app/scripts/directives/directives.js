angular.module('MusicIsEverywhereAppDirectives', [])
  .directive('audioended', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {

                scope.findInPlaylist = function(playlist,song){
                  for(var j=0; j < playlist.length ; ++j){
                        if(playlist[j].name==song.name){
                            return j;
                        }
                    }
                    return -1;
                }

                scope.getNextSong = function(playlist,song){
                    var i = scope.findInPlaylist(playlist,song);
                    for(var j=i+1; j < playlist.length ; ++j){
                        if(!playlist[j].isDirectory){
                            return playlist[j];
                        }
                    }
                    return undefined;
                };

                elem.bind('ended', function(e){
                    var song = scope.getNextSong(scope.player.playlist,scope.player.current_music);
                    if(song != undefined) {
                      scope.updatePlayer(song);
                      scope.$apply();
                    }
                });


            }
        }
}).directive('bgblur', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {

              $('#background-blur').css({height:206+(scope.current_files.length*37)});

            }
        }
});