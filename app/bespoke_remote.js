module.exports = {
    usersConnect: [],
    createUser: function(socket) {
        var user = {
            user: {
                id: socket.id,
                token_bp: false
            },
            client: socket,
            remoteUser: false
        };

        this.addUser(user);

        return user;
    },
    addUser: function(user) {
        if (this.usersConnect.hasOwnProperty(user.user.id) == false) {
            this.usersConnect[user.user.id] = user;
        }
    },
    removeUser: function(user) {
        if (this.usersConnect.hasOwnProperty(user.user.id)) {
            delete this.usersConnect[user.user.id];
        }
    },
    updateUser: function (user) {
        this.removeUser(user);
        this.addUser(user);
    },
    setRemoteUser: function (me, tokenBp) {
        var userRemote = false;
        var that = this;
        for (userId in that.usersConnect) {
            if (that.usersConnect.hasOwnProperty(userId)) {
                var u = that.usersConnect[userId];
                if (u.user.token_bp == tokenBp) {
                    userRemote = u;
                }
            }
        }

        if (userRemote) {
            me.user.remoteUser = userRemote;
            this.updateUser(me);
        }
    },
    getTokens: function() {
        var listToken = [];
        for (userId in this.usersConnect) {
            var tokenBp = this.usersConnect[userId].user.token_bp;
            if (tokenBp) {
                listToken.push(tokenBp);
            }
        }

        return listToken;
    },
    sendBespokeActionToMe: function(me, action) {
        if (me.user.remoteUser) {
            if (action == 'prev' || action == 'next' || action == 'flopoke-finger1-start') {
                me.user.remoteUser.client.emit('client-bespoke-action', action);
            }
        }
    },
    setTokenBp: function(me, tokenBp) {
        var user = this.usersConnect[me.user.id];
        if (user) {
            me.user.token_bp = tokenBp;
            this.updateUser(me);
        }
    },
    init: function(io) {
        var that = this;
        io.sockets.on('connect', function (socket) {
            var me = that.createUser(socket);

            socket.on('setTokenBp', function (tokenBp) {
                that.setTokenBp(me, tokenBp);
                socket.broadcast.emit('client-list-users', that.getTokens());
            });

            socket.on('setRemoteUser', function (userId) {
                that.setRemoteUser(me, userId);
            });

            socket.on('disconnect', function () {
                that.removeUser(me);
                socket.broadcast.emit('client-list-users', that.getTokens());
            });

            socket.on('list-users', function () {
                socket.emit('client-list-users', that.getTokens());
            });

            socket.on('bespoke-action', function (action) {
                that.sendBespokeActionToMe(me, action);
            });

            socket.on('flopoke-note', function(objNote) {
                socket.broadcast.emit('client-flopoke-note', objNote);
            });

        });
    }
};