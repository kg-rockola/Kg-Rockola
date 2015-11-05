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
    

}]);

})();