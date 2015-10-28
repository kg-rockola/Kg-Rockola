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

  $scope.startParty = function(){

    // if($scope.party.playlist.length !== 0){
    //     $scope.currentTrack=  $scope.party.playlist[0].song;
    //     $scope.temp = $sce.trustAsResourceUrl("");

    //     var iframe = document.getElementById('spotify');
    //     var innerDoc = (iframe.contentDocument) ? iframe.jh : iframe.contentWindow.document;
    //     var playButton = innerDoc.getElementById("outerWidgetContainer");

    //    console.log(innerDoc);
    
    // var queryUrl = 'spotify:user:jorgevmatarrita:playlist:5wL7O1m3zMou6zeJZkcyBu';

    // $http.post(queryUrl)
    //   .success(function(response) {
    //       console.log(response)          
    //   }); 

    var queryUrl = 'https://api.spotify.com/v1/users/jorgevmatarrita/playlists';

    $http({
      method : 'POST',
      url    : queryUrl,
      headers: {
          'Authorization': 'Bearer ' + $scope.hashParams.access_token,
          'Content-Type' : 'application/json'
        },
      data : {
        name   : 'My brand new playlist',
        public : true
      }
    }).then(function(r){
          var tracks = 'tracks?uris=spotify%3Atrack%3A4iV5W9uYEdYUVa79Axb7Rh,spotify%3Atrack%3A1301WleyT98MSxVHPZCA6M',
              id     = r.data.id,
              url    = 'https://api.spotify.com/v1/users/jorgevmatarrita/playlists/'+id+'/'+tracks;

           $http({
              method : 'POST',
              url    : url,
              headers: {
                  'Authorization': 'Bearer ' + $scope.hashParams.access_token,
                  'Content-Type' : 'application/json'
                }
            }).then(function(r){ console.log(r) }); 
    });

  }

}]);

})();