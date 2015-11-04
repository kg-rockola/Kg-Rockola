(function(){

'use strict';

rockola.controller('play_music_controller', ['$scope',
                                             '$http',
                                             'socket',
                                             '$state',
                                             'youtube_player',
                                            function(
                                              $scope,
                                              $http,
                                              socket,
                                              $state,
                                              youtube_player
                                            ){

  $scope.party           = $scope.$parent.party;
  $scope.youtube_player  = youtube_player;

  $scope.host = function(){      
     YT.ready(
          function() {
             $scope.startParty();
          }
        );
  }

  $scope.startParty = function(){
    socket.emit('host:party', $scope.deviceId);
    $scope.party.host = $scope.deviceId;
    var songId = $scope.party.playlist[0].song.id.videoId;
    $scope.youtube_player.init(songId, $scope.party.playlist);
  }

  $scope.stopHosting = function(){
    socket.emit('stop:party');
    $scope.party.host = null;
    $scope.youtube_player.destroy();
  }

  // Socket events

  socket.on('hosting:party', function(id){
    $scope.party.host = id;
  });

  socket.on('party:stoped', function(id){
    $scope.party.host = null;
  });

  if($scope.party.host === $scope.deviceId){
    if(YT){
      YT.ready(
          function() {
             $scope.startParty();
          }
        );
    }
  }

}]);

})();