bespokeController = require('../controller/bespoke');
userService =require('../service/user');

module.exports = function (io) {
    socket = io.sockets.on('connect', function (socket)
    {

        var me = userService.create(socket);

        socket.on('setTokenBp', function (tokenBp) {
            bespokeController.setTokenBpAction(socket, me, tokenBp);
        });

        socket.on('setRemoteUser', function (userId) {
            bespokeController.setRemoteUserAction(me, userId);
        });

        socket.on('disconnect', function () {
            bespokeController.disconnectAction(socket, me);
        });

        socket.on('list-users', function () {
            bespokeController.listUsersAction(socket);
        });

        socket.on('bespoke-action', function (action) {
            bespokeController.bespokeAction(me, action);
        });

        socket.on('flopoke-note', function(objNote) {
            bespokeController.flopokeNoteAction(socket, objNote);
        });
    });
};
