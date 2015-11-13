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

    // Controller dependencies.
    _this.party  = $party;
    _this.vote   = $vote;
    _this.client = $client;
    _this.socket = $socket;
    _this.search = $search;

    // Controller members.
    _this.page_size    = 5;
    _this.current_page = 1;

}]);

})();