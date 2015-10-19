/* Load the HTTP library */
var http  = require("http");
var open  = require('open');
var _port = 8888;

/* Create an HTTP server to handle responses */
http.createServer(function(request, response) {
  	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("wuot");
  	response.end();
}).listen(_port, function(){
	var url = "http:localhost:"+_port;
	console.log("Serving at: "+url);
	open(url);
});