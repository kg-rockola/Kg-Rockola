(function(){

'use strict';

rockola.controller('play_music_controller', ['$scope',
                           '$http',
                           'socket',
                           '$state',
                           '$sce',
                          function(
                            $scope,
                            $http,
                            socket,
                            $state,
                            $sce
                          ){

  $scope.party = $scope.$parent.party;

  $scope.host = function(){
      socket.emit('host:party', $scope.deviceId);
      $scope.party.host = $scope.deviceId;
  }

  // Socket events

  socket.on('hosting:party', function(id){
    $scope.party.host = id;
  });

  socket.on('party:stoped', function(id){
    $scope.party.host = null;
  });

}]);

})();