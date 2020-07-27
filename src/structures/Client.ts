import { Authorization } from './Authorization.js';
import { Permissions } from './Permissions.js';
import { oauth } from '../api/index.js';
import { resolveScopes } from '../resolvers/scopes.js';

export type ClientOptions = {
    redirect?: string,
    scopes?:string[],
    returnUrl?:string,
    state?: boolean,
    verifyScopes?: boolean,
    bot?: {
        permissions?: Permissions,
        guildId?: string,
    },
    webhook?: {
        guildId: string,
        channelId: string,
    }
}

export class Client {
    clientId: string;
    clientSecret: string;

    constructor(id: string, secret: string) {
        if (!id) throw new Error('A client ID is required');

        this.clientId = id;
        this.clientSecret = secret;
    }

    create(type = 0, options: ClientOptions = {}) {
        if (type < 0 || type > 2) throw new Error('Invalid type');
        if (type > 0 && !this.clientSecret) throw new Error('A client secret is required to use the client credentials grant');
        if (type > 0 && !options.redirect) throw new Error('A redirect URI is required');

        if (type === 0) options.scopes = ['bot'];

        const newScopes = resolveScopes(options.scopes) as string[];
        if (!newScopes.length) throw new Error('At least 1 scope is required');

        const newOptions = {
            client: this,
            type: null as null | string,
            scopes: newScopes,
            redirect: options.redirect,
            returnUrl: options.returnUrl || '/',
            state: options.state || false,
            verifyScopes: options.verifyScopes || false,
            permissions: null,
            guild: null as null | string,
            channel: null as null | string,
        };

        if (newScopes.indexOf('bot') !== -1) {
            if (typeof options.bot === 'object') {
                if (options.bot.permissions) newOptions.permissions = options.bot.permissions instanceof Permissions ? options.bot.permissions.bitfield : options.bot.permissions;
                if (options.bot.guildId) newOptions.guild = options.bot.guildId;
            }
        }

        if (type === 1) {
            newOptions.type = 'code';

            if (newScopes.indexOf('webhook.incoming') !== -1 && typeof options.webhook === 'object') {
                if (options.webhook.guildId) newOptions.guild = options.webhook.guildId;
                if (options.webhook.channelId) newOptions.channel = options.webhook.channelId;
            }
        }
        else if (type === 2) newOptions.type = 'token';

        return new Authorization(newOptions);
    }

    clientCredentials(scopes: string[]) {
        if (!this.clientSecret) throw new Error('A client secret is required to use the client credentials grant');

        return oauth.clientCredentials(this.clientId, this.clientSecret, scopes);
    }
}