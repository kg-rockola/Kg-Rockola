(function(){

'use strict';

rockola.controller('play_music_controller', ['$scope',
                           'socket',
                          function(
                            $scope,
                            socket
                          ){

  $scope.party = $scope.$parent.party;

  $scope.host = function(){
      socket.emit('host:party', $scope.deviceId);
      $scope.party.host = $scope.deviceId;
  }

  $scope.stopHosting = function(){
      socket.emit('stop:party', null);
      $scope.party.host = null;
  }

  // Socket events

  socket.on('party:stoped', function(id){
    $scope.party.host = id;
  });

   socket.on('hosting:party', function(id){
    $scope.party.host = id;
  });

}]);

})();