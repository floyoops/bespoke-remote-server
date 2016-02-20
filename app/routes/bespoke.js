bespokeController = require('../controller/bespoke');
userService =require('../service/user');

module.exports = {
    init: function(io) {
        io.sockets.on('connect', function (socket) {

            var me = userService.create(socket);

            socket.on('setTokenBp', function (tokenBp) {
                bespokeController.setTokenBp(socket, me, tokenBp);
            });

            socket.on('setRemoteUser', function (userId) {
                bespokeController.setRemoteUser(me, userId);
            });

            socket.on('disconnect', function () {
                bespokeController.disconnect(socket, me);
            });

            socket.on('list-users', function () {
                bespokeController.listUsers(socket);
            });

            socket.on('bespoke-action', function (action) {
                bespokeController.bespokeAction(me, action);
            });

            socket.on('flopoke-note', function(objNote) {
                bespokeController.flopokeNote(socket, objNote);
            });

        });
    }
};