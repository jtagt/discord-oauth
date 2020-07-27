const fetch = require('node-fetch');
const { PartialGuild } = require('../../structures/PartialGuild.js');
const { base, endpoints: { rest } } = require('../../static/api.js');

const guilds = async accessToken => {
    const response = await fetch(`${base}${rest.users.base}${rest.users.me}${rest.users.guilds}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    return json.map(g => new PartialGuild(g));
};

module.exports = { guilds };