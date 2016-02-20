module.exports = {
    usersConnect: [],
    create: function(socket) {
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
    }
};
