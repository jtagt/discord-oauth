const { Guild } = require('./Guild.js');
const { Webhook } = require('./Webhook.js');

class TokenResponse {
    constructor(data) {
        this.raw = data;

        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token || null;

        this.expires = data.expires_in;
        this.expiresAt = new Date(Date.now() + (data.expires_in * 1000));
        this.expresTimestamp = this.expiresAt.getTime();

        this.scopes = data.scope.split(' ');

        this.guild = data.guild ? new Guild(data.guild) : null;
        this.webhook = data.webhook ? new Webhook(data.webhook) : null;
    }
}

module.exports = { TokenResponse };