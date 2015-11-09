rockola.factory('youtube_player', [ // Dependencies
                                    'party',
                                    'socket',
                                  function (
                                    // Dependencies
                                    $party,
                                    $socket
                                  ){

    // Dependency injection
    var party  = $party,
        socket = $socket;

    // Elements
    var youtube_player = {};

    youtube_player.player   = null;
    youtube_player.playlist = null;

    youtube_player.destroy = function(){
      if(youtube_player.player){
        youtube_player.player.destroy();
      }
    }

    youtube_player.next = function(){
      youtube_player.player.loadVideoById(party.current_song.id.videoId);
    }

    youtube_player.end = function(){
      party.current_song = party.playlist[0].song;
      socket.emit('update:current_song', party.current_song);
      youtube_player.next();
    }

    youtube_player.unstarted = function(){
      if(!party.current_song){
        party.current_song = party.playlist[0].song;  
      }
      if(party.find(party.current_song) !== -1){
        party.remove_song(party.current_song);
      }
      socket.emit('update:current_song', party.current_song);
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
            youtube_player.end();
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

    youtube_player.get_first_song = function(){
      if(party.current_song){
        return party.current_song
      } else {
        return party.playlist[0].song;
      }
    }

    // Init function

    youtube_player.init = function(){
      if( party.playlist.length || party.current_song ){
        var first_song    = youtube_player.get_first_song();
        var first_song_id = first_song.id.videoId;

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