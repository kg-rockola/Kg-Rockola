 (function(){

'use strict';

rockola.controller('hosting_controller', ['$scope',
                           '$http',
                           'socket',
                           '$state',
                          function(
                            $scope,
                            $http,
                            socket,
                            $state
                          ){

  $scope.hashParams   = $scope.getHashParams() || '';
  $scope.partyStarted = false;

  console.log($scope.hashParams);

  $scope.stopHosting = function(){
    socket.emit('stop:party', null);
    $scope.party.host = null;
    $scope.partyStarted = false;
    $state.go('app');
  }

  $scope.startParty = function(){

    var queryUrl = 'https://api.spotify.com/v1/users/'+ $scope.hashParams.user_id +'/playlists';

    $http({
      method : 'POST',
      url    : queryUrl,
      headers: {
          'Authorization': 'Bearer ' + $scope.hashParams.access_token,
          'Content-Type' : 'application/json'
        },
      data : {
        name   : 'kg-group-sj',
        public : true
      }
    }).then(function(response){
        $scope.hashParams.playlist_id = response.data.id;
        $scope.arrangeSpotifyPlaylist();
    }).then(function(response){ 
      console.log(response)
      $scope.partyStarted = true;
    });

  };

  $scope.arrangeSpotifyPlaylist = function(){
    var tracks      = $scope.parseTracks(),
        playlist_id = $scope.hashParams.playlist_id,
        url         = 'https://api.spotify.com/v1/users/'+$scope.hashParams.user_id+'/playlists/'+playlist_id+'/'+tracks;

     $http({
        method : 'POST',
        url    : url,
        headers: {
            'Authorization': 'Bearer ' + $scope.hashParams.access_token,
            'Content-Type' : 'application/json'
          }
      });

  };

  $scope.clearSpotifyPlaylist = function(){

    var tracks = $scope.parseTracksToRemove(),
        playlist_id = $scope.hashParams.playlist_id,
        url         = 'https://api.spotify.com/v1/users/'+$scope.hashParams.user_id+'/playlists/'+playlist_id+'/tracks';

   return $http({
        method : 'DELETE',
        url    : url,
        headers: {
            'Authorization': 'Bearer ' + $scope.hashParams.access_token,
            'Content-Type' : 'application/json'
          },
        data : {
          "tracks" : tracks,
        }
      });

  }

  $scope.parseTracksToRemove = function(){
    var playlist = angular.copy($scope.party.playlist),
        i        = 0,
        l        = playlist.length,
        track    = {},
        result   = [];

    for(; (i<l); i++){
      track = {
        "uri" : 'spotify:track:'+playlist[i].song.id
      };
      result.push(track);
    }

    return result;

  }

  $scope.parseTracks = function(){
    var base     = 'tracks?uris=',
        playlist = angular.copy($scope.party.playlist),
        i        = 0,
        l        = playlist.length;

    for(; (i<l); i++){
      base += 'spotify%3Atrack%3A' + playlist[i].song.id + ',';
    }

    return base;

  }

  $scope.resolveSpotify = function(playlist){
    $scope.party.playlist = playlist;
    $scope.party.playlist = $scope.arrangePlaylist();
    $scope.clearSpotifyPlaylist()
      .then(function(response){
        $scope.arrangeSpotifyPlaylist();
      });
  }

  // Socket events

  socket.on('vote:registered' , function(playlist){
    if( $scope.partyStarted ){
      $scope.resolveSpotify(playlist);
    }
  });

  socket.on('song:added', function(playlist){
    if( $scope.partyStarted ){
      $scope.resolveSpotify(playlist);
    }
  });

}]);

})();