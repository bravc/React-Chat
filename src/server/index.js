var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3001