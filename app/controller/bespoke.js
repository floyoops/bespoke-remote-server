userService =require('../service/user');

module.exports = {

    setTokenBp: function(socket, me, tokenBp) {
        userService.setTokenBp(me, tokenBp);
        socket.broadcast.emit('client-list-users', userService.getTokens());
    },

    setRemoteUser: function (me, userId) {
        userService.setRemoteUser(me, userId);
    },

    disconnect: function (socket, me) {
        userService.removeUser(me);
        socket.broadcast.emit('client-list-users', userService.getTokens());
    },

    listUsers: function (socket) {
        socket.emit('client-list-users', userService.getTokens());
    },

    bespokeAction: function (me, action) {
        this.sendBespokeActionToMe(me, action);
    },

    flopokeNote: function(socket, objNote) {
        socket.broadcast.emit('client-flopoke-note', objNote);
    },

    sendBespokeActionToMe: function(me, action) {
        if (me.user.remoteUser) {
            if (action == 'prev' || action == 'next' || action == 'flopoke-finger1-start') {
                me.user.remoteUser.client.emit('client-bespoke-action', action);
            }
        }
    }
};