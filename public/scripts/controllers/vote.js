(function(){

'use strict';

rockola.controller('vote_controller', [ 'party',
                                        'vote',
                                        'client',
                                        'socket',
                                        'search',
                                      function(
                                         $party,
                                         $vote,
                                         $client,
                                         $socket,
                                         $search
                                      ) {

    // Controller alias.
    var _this = this;

    // Controller members.
    _this.party  = $party;
    _this.vote   = $vote;
    _this.client = $client;
    _this.socket = $socket;
    _this.search = $search;

    // Controller methods.
    _this.asd = function(YouTube_Song_Object){
      _this.vote.add_vote(YouTube_Song_Object);
    };

    // Socket events.
    _this.socket.on('vote:registered', function(playlist){
      _this.party.playlist = playlist;
      _this.party.playlist = _this.arrangePlaylist();
    });
    

}]);

})();