"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var http = require('http');
var socket_io_1 = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
server.listen(3000, function () {
    console.log('listening on *:3000');
});
