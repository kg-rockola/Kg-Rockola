(function(){

'use strict';

var rockola = angular.module("rockola", 
	[
		// Dependencies.
	]);

rockola.controller('app', ['$scope',
            						   'socket',
            							function(
            								  $scope,
            								  socket
            								){

	$scope.messages = [];
  $scope.deviceId = '';
  $scope.party    = {
    host  : true,
    songs : []
  };
  $scope.message  = '';

  $scope.send = function(){
    socket.emit('message', $scope.message);
    $scope.messages.push($scope.message);
  }

  $scope.host = function(){
    socket.emit('host:party', $scope.deviceId);
    $scope.party.host = $scope.deviceId;
  }

  socket.on('message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('host:party', function(hostId){
    $scope.party.host = hostId;
  });

  socket.on('clear:host', function(){
    $scope.party.host = null;
  });

  socket.on('init', function(data){
    $scope.messages = data.messages;
    $scope.party    = data.party;

    var deviceId = sessionStorage.getItem('deviceId');

    if(deviceId){
      $scope.deviceId = deviceId;
    } else {
      $scope.deviceId = data.deviceId;
      sessionStorage.setItem('deviceId', data.deviceId);
    }

  });

}]);

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

function log(data){ console.log(data); };

})();