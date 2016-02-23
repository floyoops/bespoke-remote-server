userService =require('./user');

module.exports = {

    setTokenBpAction: function(socket, me, tokenBp) {
        userService.setTokenBp(me, tokenBp);
        socket.broadcast.emit('client-list-users', userService.getTokens());
    },

    setRemoteUserAction: function (me, userId) {
        userService.setRemoteUser(me, userId);
    },

    disconnectAction: function (socket, me) {
        userService.remove(me);
        socket.broadcast.emit('client-list-users', userService.getTokens());
    },

    listUsersAction: function (socket) {
        socket.emit('client-list-users', userService.getTokens());
    },

    bespokeAction: function (me, action) {
        this.sendBespokeToMeAction(me, action);
    },

    flopokeNoteAction: function(socket, objNote) {
        socket.broadcast.emit('client-flopoke-note', objNote);
    },

    sendBespokeToMeAction: function(me, action) {
        if (me.user.remoteUser) {
            if (action == 'prev' || action == 'next' || action == 'flopoke-finger1-start') {
                me.user.remoteUser.client.emit('client-bespoke-action', action);
            }
        }
    }
};