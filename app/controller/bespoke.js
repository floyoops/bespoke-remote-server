bespokeService = require('../service/bespoke');
userService =require('../service/user');

module.exports = function (io) {
     io.sockets.on('connect', function (socket) {
        var me = userService.create(socket);

        socket.on('setTokenBp', function (tokenBp) {
            bespokeService.setTokenBpAction(socket, me, tokenBp);
        });

        socket.on('setRemoteUser', function (userId) {
            bespokeService.setRemoteUserAction(me, userId);
        });

        socket.on('disconnect', function () {
            bespokeService.disconnectAction(socket, me);
        });

        socket.on('list-users', function () {
            bespokeService.listUsersAction(socket);
        });

        socket.on('bespoke-action', function (action) {
            bespokeService.bespokeAction(me, action);
        });

        socket.on('flopoke-note', function(objNote) {
            bespokeService.flopokeNoteAction(socket, objNote);
        });
    });
};
