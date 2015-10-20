(function(){

'use strict';

var rockola = angular.module("rockola", []);

rockola.controller("app", ["$scope",
							"socket",
							 function(
							 		$scope,
							 		socket
							 	){
	$scope.deviceToken;
	$scope.playlist = {
		playing : false,
		host    : null,
		songs   : []
	};

	$scope.play = function(){
		socket.emit("hostParty", $scope.deviceToken, function(data){
			console.log($scope.playlist);
			$scope.playlist.host    = data.host;
			$scope.playlist.playing = true;
			$scope.$apply();
		});
	};

	socket.on("deviceToken", function(givenToken){
		$scope.deviceToken = givenToken;
	});

}]);

// Factories

rockola.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

// Socket logic

// var socket = io.connect('/');

// socket.on("connect", function(){
// 	console.log("Connected.");
// });

// socket.on("disconnect", function(){
// 	console.log("Disconnected.");
// 	clearToken();
// });

// Helpers

function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);

	while ( e = r.exec(q)) {
	   hashParams[e[1]] = decodeURIComponent(e[2]);
	}

	return hashParams;
}

function log(data){ console.log(data); };

})();