(function(){

'use strict';

rockola.controller('search_controller', ['socket',
                                         'party',
                                         'search',
                                         'vote',
                                        function(
                                          $socket,
                                          $party,
                                          $search,
                                          $vote
                                        ) {

    // Controller alias
    var _this = this;

    // Controller dependencies.
    _this.socket = $socket;
    _this.party  = $party;
    _this.search = $search;
    _this.vote   = $vote;

    // Controller members.
    _this.page_size    = 10;
    _this.current_page = 1;

    // Methods.
    _this.get_songs = function(){
      var query = _this.search.query || 'vevo';
      _this.search.request(query);
    }

    _this.clear_search = function(){
      _this.search.query_result = [];
      _this.search.query        = '';
    }

    // Socket events
    _this.socket.on('youtube:result', function(result){
      _this.search.query_result = result.items; 
    });

    // On load.
    var onLoad = function(){
      if(_this.search.query_result.length < 1){
        _this.get_songs();
      }

    }
    
    onLoad();
}]);

})();