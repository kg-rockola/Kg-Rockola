rockola.factory('client', [ // Dependencies
                            '$state',
                          function (
                            // Dependencies
                            $state
                          ){
    
    var client = {};

    // Elements.
    client.device_id = null;

    // Methods.
    client.get_state = function(){
      return $state.current.name;
    };

    // Return object.
    return client;
  
}]);