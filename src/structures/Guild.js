const { PartialGuild } = require('./PartialGuild.js');
const { Role } = require('./Role.js');
const { Emoji } = require('./Emoji.js');
const { Snowflake } = require('./Snowflake.js');
const { CDN } = require('./CDN.js');

class Guild extends PartialGuild {
    constructor(data) {
        super(data);

        this.ownerId = data.owner_id;
        this.applicationId = data.application_id;
        this.region = data.region;
        this.mfaLevel = data.mfa_level;
        this.verificationLevel = data.verification_level;
        this.defaultNotificationLevel = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;

        this.embeddable = data.embed_enabled || false;
        this.embedChannel = data.embed_channel_id || null;
        this.splash = data.splash;
        this.features = data.features;
        this.widgetEnabled = data.widget_enabled || false;
        this.widgetChannel = data.widget_channel_id;

        this.afkTimeout = data.afk_timeout;
        this.afkChannel = data.afk_channel_id;
        this.systemChannel = data.system_channel_id;

        this.roles = new Map(data.roles.map(r => [r.id, new Role(r, this)]));
        this.emojis = new Map(data.emojis.map(r => [r.id, new Emoji(r, this)]));

        this._snowflake = new Snowflake(this.id);
        this.createdAt = this._snowflake.createdAt;
        this.createdTimestamp = this._snowflake.createdTimestamp;
    }

    splashURL(options = {}) {
        return this.splash ? CDN.guildSplash(this.id, this.splash, options) : null;
    }
}

module.exports = { Guild };