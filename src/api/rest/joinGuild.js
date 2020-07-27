const fetch = require('node-fetch');
const { GuildMember } = require('../../structures/GuildMember.js');
const { base, endpoints: { rest } } = require('../../static/api.js');

const joinGuild = async (token, guildId, userId, accessToken, options = {}) => {
    const body = {
        access_token: accessToken
    };

    const response = await fetch(`${base}${rest.guilds.base}/${guildId}${rest.guilds.members}/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.assign(options, body))
    });

    let json = null;
    try {
        json = await response.json();
    }
    catch (e) {
        return false;
    }

    if (!response.ok) throw new Error(json.error);

    return new GuildMember(json);
};

module.exports = { joinGuild };