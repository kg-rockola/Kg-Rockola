(function(){

'use strict';

rockola.controller('vote_controller', ['$scope',
                                         '$http',
                                         'socket',
                                        function(
                                          $scope,
                                          $http,
                                          socket
                                        ) {

    $scope.playlist = [];

    $scope.addToPlaylist = function(song){
        $scope.playlist.push(song);
    };

    // Socket events
    
    socket.on('get:playlist', function(playlist){
      $scope.playlist = playlist;
      console.log(playlist);
    });

}]);

})();