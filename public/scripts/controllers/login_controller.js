(function(){

'use strict';

rockola.controller('login_controller', [ '$scope',
                                        '$http',
                                        'socket',
                                      function(
                                         $scope,
                                         $http,
                                         socket
                                      ) {

  $http.get('/login', function(r){
    console.log(r);
  })


}]);


})();