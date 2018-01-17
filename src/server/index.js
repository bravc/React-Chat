const express = require('express');
const app = express();


//declare port number
const PORT = process.env.PORT || 3001

//start server on PORT
const server = app.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});

//Initialize Socket IO
const io = module.exports.io = require('socket.io').listen(server);

//Set up initial connection
io.on('connection', function(socket) {
    console.log('Connected to sockets ' + socket.id);
});