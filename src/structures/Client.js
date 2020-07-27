const { Authorization } = require('./Authorization.js');
const { Permissions } = require('./Permissions.js');
const { oauth } = require('../api/index.js');
const { resolveScopes } = require('../resolvers/scopes.js');

class Client {
    constructor(id, secret) {
        if (!id) throw new Error('A client ID is required');

        this.clientId = id;
        this.clientSecret = secret;
    }

    create(type = 0, options = {}) {
        if (type < 0 || type > 2) throw new Error('Invalid type');
        if (type > 0 && !this.clientSecret) throw new Error('A client secret is required to use the client credentials grant');
        if (type > 0 && !options.redirect) throw new Error('A redirect URI is required');

        if (type === 0) options.scopes = ['bot'];

        options.scopes = resolveScopes(options.scopes);
        if (!options.scopes.length) throw new Error('At least 1 scope is required');

        const newOptions = {
            client: this,
            type: null,
            scopes: options.scopes,
            redirect: options.redirect,
            returnUrl: options.returnUrl || '/',
            state: options.state || false,
            verifyScopes: options.verifyScopes || false,
            permissions: null,
            guild: null,
            channel: null
        };

        if (options.scopes.indexOf('bot') !== -1) {
            if (typeof options.bot === 'object') {
                if (options.bot.permissions) newOptions.permissions = options.bot.permissions instanceof Permissions ? options.bot.permissions.bitfield : options.bot.permissions;
                if (options.bot.guildId) newOptions.guild = options.bot.guildId;
            }
        }

        if (type === 1) {
            newOptions.type = 'code';

            if (options.scopes.indexOf('webhook.incoming') !== -1 && typeof options.webhook === 'object') {
                if (options.webhook.guildId) newOptions.guild = options.webhook.guildId;
                if (options.webhook.channelId) newOptions.channel = options.webhook.channelId;
            }
        }
        else if (type === 2) newOptions.type = 'token';

        return new Authorization(newOptions);
    }

    clientCredentials(scopes) {
        if (!this.clientSecret) throw new Error('A client secret is required to use the client credentials grant');

        return oauth.clientCredentials(this.clientId, this.clientSecret, scopes);
    }
}

module.exports = { Client };