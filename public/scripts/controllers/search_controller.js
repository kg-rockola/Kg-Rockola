(function(){

'use strict';

rockola.controller('search_controller', ['$scope',
                                         '$http',
                                         '$sce',
                                         'socket',
                                        function(
                                          $scope,
                                          $http,
                                          $sce,
                                          socket
                                        ) {

    $scope.party            = $scope.$parent.party;
    $scope.deviceId         = $scope.$parent.deviceId;
    $scope.unfilteredResult = [];

    console.log($scope.$parent.party);

    $scope.search = function(){
        if($scope.searchParam){
            var queryUrl = "https://api.spotify.com/v1/search?q="+$scope.searchParam+"&type=track";

            $http.get(queryUrl)
                .success(function(response) {
                    $scope.unfilteredResult = response.tracks.items; 
                    $scope.foundTracks      =  $scope.filterFoundTracks($scope.unfilteredResult);   
                }); 
        }

        $scope.searchParam = '';
    }

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

    $scope.getSong = function(){
        if($scope.playlist.length !== 0){
            var ind= $scope.getIndex();
            $scope.currentTrack=  $scope.playlist[ind];
            var track = spotify.createFromLink('spotify:track:05JqOBN6XW4eFUVQlgR0I3');
            $scope.temp=$sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:"+ $scope.currentTrack.id);
            var iframe = document.getElementById('spotify');
            //var innerDoc = (iframe.contentDocument) ? iframe.jh : iframe.contentWindow.document;
            //var playButton = innerDoc.getElementById("outerWidgetContainer");
           // console.log(innerDoc);
            console.log(track);
        }
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