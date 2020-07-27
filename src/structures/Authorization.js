const { URLSearchParams } = require('url');
const { BearerClient } = require('./BearerClient.js');
const { Permissions } = require('./Permissions.js');
const { State } = require('./State.js');
const { oauth } = require('../api/index.js');
const { verifyScopes } = require('../util/verifyScopes.js');
const { randomString } = require('../util/randomString.js');
const { base, endpoints } = require('../static/api.js');

class Authorization {
    constructor(options = {}) {
        this.client = options.client;
        this.state = options.state;
        this.verifyScopes = options.verifyScopes;

        this.scopes = options.scopes;
        this.redirect = options.redirect;
        this.returnUrl = options.returnUrl;
        this.type = options.type;

        this.permissions = options.permissions;
        this.guild = options.guild;
        this.channel = options.channel;
    }

    generate(returnUrl = this.returnUrl, state = randomString(20)) {
        state = new State({ state: this.state ? state : null, returnUrl });

        const params = new URLSearchParams();

        params.append('client_id', this.client.clientId);
        params.append('scope', this.scopes.join(' '));
        if (state) params.append('state', state);

        if (this.redirect) params.append('redirect_uri', this.redirect);
        if (this.type) params.append('response_type', this.type);

        if (this.permissions) params.append('permissions', this.permissions);
        if (this.guild) params.append('guild_id', this.guild);
        if (this.channel) params.append('channel_id', this.channel);

        const url = `${base}${endpoints.oauth.base}${endpoints.oauth.authorize}?${params.toString()}`;

        return { url, state: state.state };
    }

    async callback(params, state = null) {
        params = new URLSearchParams(params);
        if (params.has('error')) return { error: true, message: params.get('error'), redirect: '/' };
        if (!params.has('code')) return { error: true, message: 'Missing code' };

        const cbState = params.has('state') ? new State(params.get('state')) : null;
        if (this.state && (!cbState || cbState.state !== state)) return { error: true, message: 'Invalid or missing state', redirect: cbState ? cbState.return : '/' };

        const response = {
            error: false,
            token: null,
            bearer: null,
            guildId: null,
            permissions: null,
            redirect: cbState ? cbState.return : '/'
        };

        if (params.has('guild_id')) response.guildId = params.get('guild_id');
        if (params.has('permissions')) response.permissions = new Permissions(params.get('permissions'), false, false);

        try {
            response.token = await oauth.token({
                id: this.client.clientId,
                secret: this.client.clientSecret,
                grant: 'authorization_code',
                code: params.get('code'),
                redirect: this.redirect,
                scopes: this.scopes
            });

            if (this.verifyScopes && !verifyScopes(this.scopes, response.token.scopes)) return { error: true, error: 'Scopes do not match', redirect: cbState ? cbState.return : null };
        }
        catch (e) {
            return { error: true, error: 'Error getting access token', redirect: cbState ? cbState.return : null };
        }

        response.bearer = new BearerClient(this, response.token.accessToken, response.token.refreshToken);
        await response.bearer.fetchData();

        return response;
    }
}

module.exports = { Authorization };