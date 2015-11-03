rockola.factory('youtube_player', ['$rootScope',
                                  function (
                                    $rootScope
                                  ){

    var youtube_player = {};

    youtube_player.player   = null;
    youtube_player.playlist = null;

    youtube_player.destroy = function(){
      if(youtube_player.player){
        youtube_player.player.destroy();
      }
    }

    youtube_player.next = function(songId){
        console.log(youtube_player.player)
        if(youtube_player.player){
          youtube_player.player.loadVideoById(songId);
        }
    }

    // Events

    youtube_player.onPlayerReady = function(event) {
      event.target.playVideo();
    }

    youtube_player.onPlayerStateChange = function(event) {
        var state = event.data;
        
        switch(state){
          case -1:
            // Unstarted 
            console.log('Unstarted.');
            break;
          case 0:
            // Ended
            console.log('Ended.');
            youtube_player.next();
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
            console.log('An error ocurred, event type not expected: Event id -> '+state);
            break;
        }

      }

    // Init function

    youtube_player.init = function(songId, playlist){
      youtube_player.playlist = playlist;
      youtube_player.player = new YT.Player('player', {
          videoId: songId,
          events: {
            'onReady'       : youtube_player.onPlayerReady,
            'onStateChange' : youtube_player.onPlayerStateChange
          }
        });
    }

    // Return object.
    return youtube_player;
  
}]);