const { Permissions } = require('./Permissions.js');
const { Snowflake } = require('./Snowflake.js');

class Role {
    constructor(data, guild) {
        this.raw = data;
        this.guild = guild;

        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.permissions = new Permissions(data.permissions, false, true);

        this.hoist = data.hoist;
        this.position = data.position;

        this.managed = data.managed;
        this.mentionable = data.mentionable;

        this._snowflake = new Snowflake(this.id);
        this.createdAt = this._snowflake.createdAt;
        this.createdTimestamp = this._snowflake.createdTimestamp;
    }
}

module.exports = { Role };