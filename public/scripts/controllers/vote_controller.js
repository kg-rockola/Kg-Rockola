(function(){

'use strict';

rockola.controller('vote_controller', [ '$scope',
                                        '$http',
                                        'socket',
                                      function(
                                         $scope,
                                         $http,
                                         socket
                                      ) {

    $scope.party     = $scope.$parent.party;
    $scope.deviceId  = $scope.$parent.deviceId;

    $scope.vote = function(songId){
      socket.emit('vote:song', {
        song : songId,
        user : $scope.deviceId
      });

      var songIndex = $scope.getSongIndex(songId),
          userVoted = $scope.getUserVoted($scope.deviceId, songIndex);

      if(userVoted === false){
        $scope.party.playlist[songIndex].votes.push($scope.deviceId);
        $scope.party.playlist = $scope.arrangePlaylist();
      }

    };

    $scope.userHasVoted = function(song){
      console.log(song)
    };

    // Socket events
    
    socket.on('vote:registered', function(playlist){
      $scope.party.playlist = playlist;
      $scope.party.playlist = $scope.arrangePlaylist();
    });
    

}]);

})();