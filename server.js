//var config = require("./config.js")();
var open   = require("open");
var _port  = 8888;

var express       = require('express'); // Express web server framework
var request       = require('request'); // "Request" library
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');
var redirect_uri  = 'http://localhost:'+_port+'/callback'; // Your redirect uri
var helpers       = require('./lib/helpers.js');


// Youtube

var YouTube_Node = require('youtube-node'),
    youtube      = new YouTube_Node(),
    appKey       = "AIzaSyDrvTaEi2w7ASFkKQKs7HP_3wGce5IGtk8";

youtube.setKey(appKey);
youtube.addParam('type', 'video');

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

var server = app.listen(_port, function(){
  var url = "http://localhost:"+_port;
  // open(url);
});

// Sockets

var io       = require("socket.io").listen(server);
var party    = {
                  host         : null,
                  playlist     : [],
                  current_song : null
                };

io.on("connection", handleIO);
  
function handleIO(socket){
  // Variables.
  

  function disconnect(){
      // socket.disconnect(true);
      // socket.broadcast.emit('user:disconnected', device_id);
  }

  socket.on('update:current_song', function($current_song){
    party.current_song = $current_song;
    socket.broadcast.emit('current_song:updated', $current_song);
  });

  socket.emit("init", {
    party    : party,
    deviceId : helpers.guid()
  });

  socket.on('disconnect:user', function(user_that_disconnected){
    socket.broadcast.emit('user:disconnected', user_that_disconnected);
  });

  socket.on('add:song', function($playlist){
    party.playlist = $playlist;
    socket.broadcast.emit('song:added', $playlist);
  });

  socket.on('remove:song', function($playlist){
    party.playlist = $playlist;
    socket.broadcast.emit('song:removed', $playlist);
  });

  socket.on('update:playlist', function($playlist){
    party.playlist = $playlist;
    socket.broadcast.emit('playlist:updated', $playlist);
  })

  socket.on('host:party', function(hostId){
    party['host'] = hostId;
    socket.broadcast.emit('hosting:party', hostId)
  });

  socket.on('searching:youtube', function(query){
    youtube.search(query, 24, function(error, result){
      if(error){
        socket.emit('youtube:result:failed', error);
      } else {
        socket.emit('youtube:result', result);
      }
    })
  });

  socket.on('stop:party', function(){
    party['host'] = null;
    socket.broadcast.emit('party:stoped', null)
  });

  socket.on('vote:song', function($playlist){
    party.playlist = $playlist;
    socket.broadcast.emit('vote:registered', $playlist);
  });

};

io.configure(function(){
  io.enable("browser client minification");
  io.enable("browser client etag");
  io.set("log level", 1);
  io.set("transports", [
      "websocket",
      "xhr-polling",
      "jsonp-polling"
    ]);
});

