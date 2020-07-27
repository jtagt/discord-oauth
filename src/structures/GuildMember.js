const { User } = require('./User.js');

class GuildMember {
    constructor(data) {
        this.raw = data;

        this.user = new User(data.user);

        this.nick = data.nick;
        this.roles = data.roles;
        this.deaf = data.deaf;
        this.mute = data.mute;

        this.joinedAt = new Date(data.joined_at);
        this.joinedTimestamp = this.joinedAt.getTime();
    }
}

module.exports = { GuildMember };