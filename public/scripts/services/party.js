rockola.factory('party', [ // Dependencies
                            'client',
                            'socket',
                          function (
                            // Dependencies
                            $client,
                            $socket
                          ){

  // Models.
  var client = $client,
      socket = $socket;

  // Main object.
  var party     = {};

  // Main object members.
  party.host         = null;
  party.current_song = null;
  party.playlist     = [];

  // Methods.
  party.add_song = function(YouTube_Song_Object){
    if(party.find(YouTube_Song_Object) === -1){
      var new_song = {
        song    : YouTube_Song_Object,
        creator : client.device_id,
        state   : 'unstarted', // States: unstarted - playing - ended.
        votes   : [client.device_id]
      }

      party.playlist.push(new_song);
      party.arrange_playlist();
      socket.emit('add:song', party.playlist);
    }
  };

  party.remove_song = function(YouTube_Song_Object){
    var song_index = party.find(YouTube_Song_Object);

    if(song_index !== -1){
      party.playlist.splice(song_index, 1);
      socket.emit('remove:song', party.playlist);
    }
  }

  party.process_song = function(YouTube_Song_Object) {
    var song_index = party.find(YouTube_Song_Object);

    if(song_index === -1){
      party.add_song(YouTube_Song_Object);
    } else {
      if( party.playlist[song_index].creator === client.device_id ){
        party.remove_song(YouTube_Song_Object);
      }
    }
    
  }

  party.find = function(YouTube_Song_Object){
    var i           = 0,
        l           = party.playlist.length,
        id_to_match = YouTube_Song_Object.id.videoId;

    for(; (i<l); i++){
      var  video_id = party.playlist[i].song.id.videoId;
      if(video_id === id_to_match){
        return i;
      }
    }

    return -1;

  };
  
  party.get_next_song = function(){
      for(var song in party.playlist){
        if(party.playlist[song].state === 'playing' || party.playlist[song].state === 'unstarted' ){
          return party.playlist[song];
        }
      }

      return false;
    }

  party.arrange_playlist = function(){
  var i        = 0,
      playlist = angular.copy(party.playlist),
      l        = playlist.length,
      playing  = null,
      ended    = [],
      filtered = [];

    for(i; (i<l); i++){
      var most_rated = get_most_rated(playlist);
      var song       = playlist[most_rated];
      var state      = song.state;
      if( state === 'ended' ){
        ended.push(playlist[most_rated]);
      } else if(state === 'playing') {
        playing = song;
      } else {
        filtered.push(playlist[most_rated]);
      }

      playlist.splice(most_rated, 1);
    }

    if(playing) {
      filtered.unshift(playing);
    }

    party.playlist = filtered;

  };

  // Helpers.
  function get_most_rated(playlist){
    var i            = 0,
        l            = playlist.length,
        most_rated   = playlist[0].votes.length,
        most_popular = 0;

    for(; (i<l); i++){
      var track = playlist[i].votes.length;
      if(track > most_rated){
        most_rated   = track;
        most_popular = i;
      }
    }

    return most_popular;

  }

    // Return main object.
    return party;
  
}]);