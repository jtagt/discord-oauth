const { User } = require('./User.js');
const { Snowflake } = require('./Snowflake.js');
const { CDN } = require('./CDN.js');

class Emoji {
    constructor(data, guild) {
        this.raw = data;
        this.guild = guild;

        this.id = data.id;
        this.name = data.name;
        this.roles = data.roles;
        this.managed = data.managed;
        this.animated = data.animated;

        this.user = data.user ? new User(data.user) : null;

        this.custom = !!this.id;
        this.requiresColons = data.require_colons || this.custom;

        if (this.id) {
            this._snowflake = new Snowflake(this.id);
            this.createdAt = this._snowflake.createdAt;
            this.createdTimestamp = this._snowflake.createdTimestamp;
        }
    }

    url(options = {}) {
        return this.custom ? CDN.customEmoji(this.id, options) : null;
    }

    toString() {
        return this.custom ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name;
    }
}

module.exports = { Emoji };