const { Permissions } = require('./Permissions.js');
const { Snowflake } = require('./Snowflake.js');
const { CDN } = require('./CDN.js');

class PartialGuild {
    constructor(data) {
        this.raw = data;

        this.id = data.id;
        this.name = data.name;
        this.nameAcronym = this.name.replace(/\w+/g, w => w[0]).replace(/\s+/g, '');

        this.icon = data.icon;

        this.isOwner = data.owner || false;
        this.permissions = data.permissions ? new Permissions(data.permissions, false, false) : new Permissions();

        this._snowflake = new Snowflake(this.id);
        this.createdAt = this._snowflake.createdAt;
        this.createdTimestamp = this._snowflake.createdTimestamp;
    }

    iconURL(options = {}) {
        return this.icon ? CDN.guildIcon(this.id, this.icon, options) : null;
    }
}

module.exports = { PartialGuild };