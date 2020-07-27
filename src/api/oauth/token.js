const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { TokenResponse } = require('../../structures/TokenResponse.js');
const { base, endpoints: { oauth } } = require('../../static/api.js');

const token = async options => {
    const body = new URLSearchParams();

    body.append('client_id', options.id);
    body.append('client_secret', options.secret);
    body.append('grant_type', options.grant);
    body.append('redirect_uri', options.redirect);
    body.append('scope', options.scopes.join(' '));

    if (options.code) body.append('code', options.code);
    if (options.refresh) body.append('refresh_token', options.refresh);

    const response = await fetch(`${base}${oauth.base}${oauth.token.base}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    return new TokenResponse(json);
};

module.exports = { token };