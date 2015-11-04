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

  
  $scope.asd = function(){
    console.log($scope.host)
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