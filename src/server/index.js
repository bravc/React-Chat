const express = require('express');
const app = express();
const { ADD_USER, BAD_NAME } = require('../constants');

//declare port number
const PORT = process.env.PORT || 3001

//start server on PORT
const server = app.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});

//Initialize Socket IO
const io = module.exports.io = require('socket.io').listen(server);

let connectedUsers = {};


app.use( express.static(__dirname + '/../../build'));

//Set up initial connection and handle connections
io.on('connection', function(socket) {
    console.log('Connected to socket ' + socket.id);



    socket.on(ADD_USER, (name) => {
        if (connectedUsers[name] === null){
            connectedUsers[name] = name;
        }else{
            socket.emit(BAD_NAME);
        }
    });
});