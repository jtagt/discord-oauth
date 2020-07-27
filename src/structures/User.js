const { Snowflake } = require('./Snowflake.js');
const { CDN } = require('./CDN.js');

class User {
    constructor(data) {
        this.raw = data;

        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        this.bot = data.bot || false;
        this.mfaEnabled = data.mfa_enabled || false;
        this.locale = data.locale || null;
        this.verified = data.verified || false;
        this.email = data.email || null;

        this.avatar = data.avatar;

        this._snowflake = new Snowflake(this.id);
        this.createdAt = this._snowflake.createdAt;
        this.createdTimestamp = this._snowflake.createdTimestamp;
    }

    defaultAvatarURL(options = {}) {
        return CDN.defaultUserAvatar(this.discriminator % 5, options);
    }

    avatarURL(options = {}) {
        return this.avatar ? CDN.userAvatar(this.id, this.avatar, options) : null;
    }

    displayAvatarURL(options = {}) {
        return this.avatar ? this.avatarURL(options) : this.defaultAvatarURL(options);
    }

    toString() {
        return `<@${this.id}>`;
    }
}

module.exports = { User };