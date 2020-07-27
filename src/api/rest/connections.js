const fetch = require('node-fetch');
const { base, endpoints: { rest } } = require('../../static/api.js');

const connections = async accessToken => {
    const response = await fetch(`${base}${rest.users.base}${rest.users.me}${rest.users.connections}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    return json;
};

module.exports = { connections };