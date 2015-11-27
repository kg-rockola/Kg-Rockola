rockola.factory('youtube_player', [ // Dependencies
                                    'party',
                                    'socket',
                                    'toastr',
                                    '$rootScope',
                                  function (
                                    // Dependencies
                                    $party,
                                    $socket,
                                    $toastr,
                                    $rootScope
                                  ){

    // Dependency injection
    var party  = $party,
        toastr = $toastr,
        socket = $socket;

    // Elements
    var youtube_player = {};

    youtube_player.player   = null;
    youtube_player.playlist = null;

    youtube_player.play_next = function(){
      var next_song = party.get_next_song();

      if(next_song) {
        youtube_player.player.loadVideoById(next_song.song.id.videoId);
      } else {
        $rootScope.$broadcast('stop:hosting');
      }
    }

    youtube_player.song_ended = function(){
      party.playlist[0].state = 'ended';
      party.arrange_playlist();

      $rootScope.$broadcast('playlist:updated');
      socket.emit('update:playlist', party.playlist);

      youtube_player.play_next();
    }

    youtube_player.unstarted = function(){
      // 
    }

    youtube_player.playing = function(){
      party.playlist[0].state = 'playing';
      socket.emit('update:playlist', party.playlist);
      $rootScope.$broadcast('playlist:updated');
    }

    youtube_player.destroy = function(){
      if(youtube_player.player){ 
          if(youtube_player.player.f){ // f = div in wich the player is created.

            youtube_player.player.destroy();
          }
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
            youtube_player.unstarted();
            break;
          case 0:
            // Ended
            console.log('Ended.');
            youtube_player.song_ended();
            break;
          case 1:
            // Playing
            console.log('Playing.');
            youtube_player.playing();
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
    youtube_player.init = function(){
      toastr.toast( "info", // Type
                    "toast-top-full-width", // CSS Class
                    "Oh yep !! This is happening !!" // MSG
                  );

      if( party.playlist.length ){
        var first_song    = party.get_next_song();
        var first_song_id = first_song.song.id.videoId;

          youtube_player.player = new YT.Player('player', {
            videoId: first_song_id,
            events: {
              'onReady'       : youtube_player.onPlayerReady,
              'onStateChange' : youtube_player.onPlayerStateChange
            }
          });
      }
    }

    // Return object.
    return youtube_player;
  
}]);