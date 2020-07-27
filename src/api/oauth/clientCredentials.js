const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { TokenResponse } = require('../../structures/TokenResponse.js');
const { basicAuth } = require('../../util/basicAuth.js');
const { resolveScopes } = require('../../resolvers/scopes.js');
const { base, endpoints: { oauth } } = require('../../static/api.js');

const clientCredentials = async (id, secret, scopes) => {
    scopes = resolveScopes(scopes);

    if (!scopes.length) throw new Error('At least 1 scope is required');

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('scope', scopes.join(' '));

    const response = await fetch(`${base}${oauth.base}${oauth.token.base}`, {
        method: 'POST',
        headers: {
            'Authorization': basicAuth(id, secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    return new TokenResponse(json);
};

module.exports = { clientCredentials };