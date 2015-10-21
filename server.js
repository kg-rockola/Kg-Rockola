//var config = require("./config.js")();
var open   = require("open");
var _port  = 8888;

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express       = require('express'); // Express web server framework
var request       = require('request'); // "Request" library
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');
var client_id     = '03ffe0cac0a0401aa6673c3cf6d02ced'; // Your client id
var client_secret = 'a57c43efb9644574a96d6623fb8bfbc2'; // Your client secret
var redirect_uri  = 'http://localhost:'+_port+'/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

var server = app.listen(_port, function(){
  var url = "http://localhost:"+_port;
  console.log("Serving at: "+url);
  // open(url);
});


// Sockets

var io       = require("socket.io").listen(server);
var messages = [];
var party    = {};

io.on("connection", handleIO);

function handleIO(socket){
  // Logs
  console.log("Server connected");
  socket.on("disconnect", disconnect);
  function disconnect(){
      console.log("Server disconnected");
      socket.broadcast.emit('user:left', 'User disconnected');
  }

  socket.emit("init", {
    messages : messages,
    party    : party,
    deviceId : guid()
  });
  
  socket.on('message', function(data){
    messages.push(data);
    socket.broadcast.emit('message', data);
  });

  socket.on('host:party', function(hostId){
    party['host'] = hostId;
    socket.broadcast.emit('host:party', hostId)
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

// Helpers 

function guid() { // Globally unique identifier
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// export function for listening to the socket
// module.exports = function (socket) {

//   // send the new user their name and a list of users
//   socket.emit('message', function(data){
//     console.log(data);
//     socket.broadcast.emit('emit', {
//       message : data.message
//     });
//   });

// };