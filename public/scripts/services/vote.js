rockola.factory('vote', [ // Dependencies
                            'client',
                            'socket',
                            'party',
                          function (
                            // Dependencies
                            $client,
                            $socket,
                            $party
                          ){

    // Models
    var client = $client,
        socket = $socket,
        party  = $party;

    // Factory object
    var vote = {};
    
    // Methods
	vote.user_has_voted = function(YouTube_Song_Object){
		var song_index = party.find(YouTube_Song_Object);

    if( song_index !== -1 ){
      var votes      = party.playlist[song_index].votes,
          device_id  = client.device_id,
          i          = 0,
          l          = votes.length;

      for(i=0; (i<l); i++){
          var  vote = votes[i];
          if(vote === device_id){
            return true;
          }
      }

    } 

    return false;
	};

  vote.get_most_rated = function($playlist){
    var i            = 0,
        l            = $playlist.length,
        most_rated   = $playlist[0].votes.length,
        most_popular = 0;

    for(; (i<l); i++){
      var track = $playlist[i].votes.length;
      if(track > most_rated){
        most_rated   = track;
        most_popular = i;
      }
    }

    return most_popular;
  }

  vote.add_vote = function(YouTube_Song_Object){    
    var song_index = party.find(YouTube_Song_Object),
        user_voted = vote.user_has_voted(YouTube_Song_Object);

    if(user_voted === false){
      party.playlist[song_index].votes.push(client.device_id);
      party.arrange_playlist();
      console.log(party.playlist)
      socket.emit('vote:song', party.playlist);
    }

  }

    // Return object.
    return vote;
  
}]);