const { Snowflake } = require('./Snowflake.js');

class Webhook {
    constructor(data) {
        this.raw = data;

        this.id = data.id;
        this.token = data.token;
        this.name = data.name;
        this.url = data.url;
        this.avatar = data.avatar;

        this.channelId = data.channel_id;
        this.guildId = data.guild_id;

        this._snowflake = new Snowflake(this.id);
        this.createdAt = this._snowflake.createdAt;
        this.createdTimestamp = this._snowflake.createdTimestamp;
    }

    get() { }

    send() { }

    edit() { }

    delete() { }
}

module.exports = { Webhook };