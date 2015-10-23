(function(){

'use strict';

rockola.controller('play_music_controller', ['$scope',
                           'socket',
                           '$sce',
                          function(
                            $scope,
                            socket,
                            $sce
                          ){

  $scope.party = $scope.$parent.party;

  $scope.host = function(){
      socket.emit('host:party', $scope.deviceId);
      $scope.party.host = $scope.deviceId;
      $scope.getSong();
  }

  $scope.stopHosting = function(){
      socket.emit('stop:party', null);
      $scope.party.host = null;
  }

  $scope.getSong = function(){
      if($scope.party.playlist.length !== 0){
          $scope.currentTrack=  $scope.party.playlist[0].song;
          $scope.temp=$sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:"+ $scope.currentTrack.id);
          var iframe = document.getElementById('spotify');
          //var innerDoc = (iframe.contentDocument) ? iframe.jh : iframe.contentWindow.document;
          //var playButton = innerDoc.getElementById("outerWidgetContainer");
         // console.log(innerDoc);
      }
  };

  // Socket events

  socket.on('party:stoped', function(id){
    $scope.party.host = id;
  });

   socket.on('hosting:party', function(id){
    $scope.party.host = id;
  });

}]);

})();