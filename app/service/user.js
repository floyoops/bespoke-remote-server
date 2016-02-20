//var User =require('../model/user');

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

        this.add(user);

        return user;
    },
    add: function(user) {
        if (this.usersConnect.hasOwnProperty(user.user.id) == false) {
            this.usersConnect[user.user.id] = user;
        }
    },
    remove: function(user) {
        if (this.usersConnect.hasOwnProperty(user.user.id)) {
            delete this.usersConnect[user.user.id];
        }
    },
    update: function (user) {
        this.remove(user);
        this.add(user);
    },
    setRemoteUser: function (me, tokenBp) {
        var userRemote = false;
        var that = this;
        for (var userId in that.usersConnect) {
            if (that.usersConnect.hasOwnProperty(userId)) {
                var u = that.usersConnect[userId];
                if (u.user.token_bp == tokenBp) {
                    userRemote = u;
                }
            }
        }

        if (userRemote) {
            me.user.remoteUser = userRemote;
            this.update(me);
        }
    },
    getTokens: function() {
        var listToken = [];
        for (var userId in this.usersConnect) {
            var tokenBp = this.usersConnect[userId].user.token_bp;
            if (tokenBp) {
                listToken.push(tokenBp);
            }
        }

        return listToken;
    },
    setTokenBp: function(me, tokenBp) {
        var user = this.usersConnect[me.user.id];
        if (user) {
            me.user.token_bp = tokenBp;
            this.update(me);
        }
    }
};
