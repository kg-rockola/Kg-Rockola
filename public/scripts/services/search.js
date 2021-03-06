rockola.factory('search', [ // Dependencies
                            'socket',
                          function (
                            // Dependencies
                            $socket
                          ){

    // Main object.
    var search_engine = {};

    // Models.
    var socket = $socket;

    // Main object members.
    search_engine.query        = '';
    search_engine.query_result = [];

    // Methods.
    search_engine.request = function(query){
      socket.emit('searching:youtube', query);
    };

    search_engine.thumbnail = function(url){
      var thumbnail = url || '/images/icons/image-not-found.png';
      return thumbnail;
    };


    // Return object.
    return search_engine;
  
}]);