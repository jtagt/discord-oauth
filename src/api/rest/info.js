const fetch = require('node-fetch');
const { User } = require('../../structures/User.js');
const { base, endpoints: { rest } } = require('../../static/api.js');

const info = async accessToken => {
    const response = await fetch(`${base}${rest.users.base}${rest.users.me}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    return new User(json);
};

module.exports = { info };