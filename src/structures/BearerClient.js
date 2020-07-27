const { oauth, rest } = require('../api/index.js');

class BearerClient {
    constructor(authorization, accessToken, refreshToken) {
        if (!authorization) throw new Error('An authorization object is required');
        if (!accessToken) throw new Error('An access token is required');

        this.authorization = authorization;

        this.accessToken = accessToken;
        this.refreshToken = refreshToken || null;

        this.user = null;
        this.guilds = new Map();
        this.connections = new Map();
    }

    async fetchData() {
        if (this.authorization.scopes.indexOf('identify') !== -1 || this.authorization.scopes.indexOf('email') !== -1) await this.getInfo();
        if (this.authorization.scopes.indexOf('guilds') !== -1) await this.getGuilds();
        if (this.authorization.scopes.indexOf('connections') !== -1) await this.getConnections();

        return true;
    }

    async getInfo() {
        const user = await rest.info(this.accessToken);
        this.user = user;

        return this.user;
    }

    async getGuilds() {
        const guilds = await rest.guilds(this.accessToken);
        this.guilds = new Map(guilds.map(g => [g.id, g]));

        return this.guilds;
    }

    async getConnections() {
        const connections = await rest.connections(this.accessToken);
        this.connections = connections;

        return this.connections;
    }

    joinGuild(token, guildId, options = {}) {
        if (!this.user) throw new Error('Cannot get user ID, you may need to add the "identify" or "email" scope');

        return rest.joinGuild(token, guildId, this.user.id, this.accessToken, options);
    }

    async refresh() {
        if (!this.refreshToken) throw new Error('A refresh token is required to refresh the token');

        const refreshed = await oauth.token({
            id: this.authorization.client.clientId,
            secret: this.authorization.client.clientSecret,
            grant: 'refresh_token',
            refresh: this.refreshToken,
            redirect: this.authorization.redirect,
            scopes: this.authorization.scopes
        });

        this.accessToken = refreshed.accessToken;
        this.refreshToken = refreshed.refreshToken;

        return refreshed;
    }

    async revoke() {
        await oauth.revoke(this.accessToken);
        await oauth.revoke(this.refreshToken);

        this.accessToken = null;
        this.refreshToken = null;

        return true;
    }
}

module.exports = { BearerClient };