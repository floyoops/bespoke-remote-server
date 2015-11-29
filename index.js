var cors = require('cors');
var app = require('express')();
var server = require('http').Server(app).listen(8000);
var io = require('socket.io')(server);
var bespokeRemote = require('./app/bespoke_remote.js').init(io);

app.get('/', function(req, res) {
    res.render('index.jade');
});
