var path = require('path');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');



var app = express();
var server = http.createServer(app);
app.use(express.static(path.join(__dirname,'html')));

var io = socketio.listen(server);

io.on('connection', function (socket) {
	console.log('ligou-se um cliente');
});

app.get('/',function(req,res) {
  res.send('ola mundo');
});



server.listen(5000);
