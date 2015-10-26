(function(){

'use strict';

rockola.controller('search_controller', ['$scope',
                                         '$http',
                                         'socket',
                                        function(
                                          $scope,
                                          $http,
                                          socket
                                        ) {

    $scope.party            = $scope.$parent.party;
    $scope.deviceId         = $scope.$parent.deviceId;
    $scope.unfilteredResult = [];

    $scope.search = function(){
        
        var offset = 0,
            limit  = 24;

        if($scope.searchParam){
            var queryUrl = "https://api.spotify.com/v1/search?q="+$scope.searchParam+"&type=track&limit="+limit+"&offset="+offset;

            $http.get(queryUrl)
                .success(function(response) {
                    $scope.unfilteredResult = response.tracks.items; 
                    $scope.foundTracks      =  $scope.filterFoundTracks($scope.unfilteredResult);   
                }); 
        }

        $scope.searchParam = '';
    }

    $scope.clearSearch = function(){
      $scope.foundTracks      = [];
      $scope.unfilteredResult = [];
      $scope.searchParam      = '';
    }

    $scope.getSongImage = function(url){
      var result = url || '/images/icons/image-not-found.png';
      
      return result;
    };

    $scope.addSong = function($song){
        var songData = {
            song  : $song,
            votes : [$scope.deviceId]
        };

        socket.emit('add:song', songData);
        $scope.addToPlaylist(songData);
        $scope.foundTracks = $scope.filterFoundTracks($scope.unfilteredResult);
    }

    $scope.addToPlaylist = function(song){
        $scope.party.playlist.push(song);
    };


    $scope.filterFoundTracks = function(tracks){
      var playlist = $scope.party.playlist,
          filtered = [],
          i        = 0,
          l        = playlist.length;

      var playlistSong = '',
          dupedSong    = false;

      for(var track in tracks){
          dupedSong = false;
          for(i=0; (i<l); i++){
              playlistSong = playlist[i];
              if(playlistSong.song.id === tracks[track].id){
                  dupedSong = true;
              }
          }
          if(dupedSong === false){
           filtered.push(tracks[track]);
          }
      }

      return filtered;
    }

    $scope.getDurationMinutes = function(millis){
        var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    // Socket events
    
    socket.on('song:added', function(playlist){
        $scope.party.playlist = playlist;
        $scope.party.playlist = $scope.arrangePlaylist();
    });

}]);

})();