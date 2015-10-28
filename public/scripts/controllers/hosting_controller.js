 (function(){

'use strict';

rockola.controller('hosting_controller', ['$scope',
                           '$http',
                           'socket',
                           '$state',
                           '$sce',
                          function(
                            $scope,
                            $http,
                            socket,
                            $state,
                            $sce
                          ){

  $scope.hashParams = $scope.getHashParams() || '';

  console.log($scope.hashParams);

  $scope.stopHosting = function(){
    socket.emit('stop:party', null);
    $scope.party.host = null;
    $state.go('app');
  }

  $scope.getSong = function(){

    // if($scope.party.playlist.length !== 0){
    //     $scope.currentTrack=  $scope.party.playlist[0].song;
    //     $scope.temp = $sce.trustAsResourceUrl("");

    //     var iframe = document.getElementById('spotify');
    //     var innerDoc = (iframe.contentDocument) ? iframe.jh : iframe.contentWindow.document;
    //     var playButton = innerDoc.getElementById("outerWidgetContainer");

    //    console.log(innerDoc);
    
    var queryUrl = 'spotify:user:jorgevmatarrita:playlist:5wL7O1m3zMou6zeJZkcyBu';

    $http.post(queryUrl)
      .success(function(response) {
          console.log(response)          
      }); 
  }

}]);

})();