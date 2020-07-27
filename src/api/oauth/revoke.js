const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { base, endpoints: { oauth } } = require('../../static/api.js');

const revoke = async token => {
    const params = new URLSearchParams();

    params.append('token', token);

    const response = await fetch(`${base}${oauth.base}${oauth.token.base}${oauth.token.revoke}?${params.toString()}`);

    if (!response.ok) throw new Error((await response.json()).error);

    return true;
};

module.exports = { revoke };