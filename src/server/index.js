const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server, {origins: 'https://chat.braverthanman.com:* https://quick-chat-app.herokuapp.com:* http://localhost:*'});
const { ADD_USER, BAD_NAME, USER_CONNECTED } = require('../constants');

const { createUser } = require('../factories');


//declare port number
const PORT = process.env.PORT || 3001

let connectedUsers = {};


app.use( express.static(__dirname + '/../../build'));

//Set up initial connection and handle connections
io.on('connection', function(socket) {
    console.log('Connected to socket ' + socket.id);

    socket.on(USER_CONNECTED, function(username, callback){
        if(username in connectedUsers){
            callback({nameTaken: true, user:null});
        }else{
            callback({nameTaken: false, user:createUser({name: username})});
        }
    });


    socket.on(ADD_USER, function(user){
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user

        console.log(connectedUsers);

    });

});

app.post('/login', function(req, res){
    console.log(req.params);
    res.redirect("/");
});

//start server on PORT
server.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});



//helper function to add new users
function addUser(userList, user){
	let newList = Object.assign({}, userList);
	newList[user.name] = user;
	return newList;
}

function userExists(userList, user){
    Object.keys(userList).forEach(function(loggedUser){
        if(loggedUser.name.equals(user.name)){
            return true;
        }
    });
    return false;
}


