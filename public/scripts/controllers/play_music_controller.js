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

/*
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady(id) {

        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: id,
          events: {
            'onReady'       : onPlayerReady,
            'onStateChange' : onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        var state = event.data;
        
        switch(state){
          case -1:
            // Unstarted 
            console.log('Unstarted.');
            break;
          case 0:
            // Ended
            console.log('Ended.');
            break;
          case 1:
            // Playing
            console.log('Playing.');
            break; 
          case 2:
            // Paused
            console.log('Paused.');
            break;
          case 3:
            // Buffering
            console.log('Buffering.');
            break; 
          case 5:
            // Video cued
            console.log('Cued.');
            break; 
          default:
            // Error
            console.log('An error ocurred, event type not expected: Event id = '+state);
            break;
        }


      }
      function destroy() {
        player.destroy();
      } */