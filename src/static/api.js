const version = 6;
const base = `https://discordapp.com/api/v${version}`;

const endpoints = {
    oauth: {
        base: '/oauth2',
        authorize: '/authorize',
        token: {
            base: '/token',
            revoke: '/revoke'
        }
    },
    rest: {
        users: {
            base: '/users',
            me: '/@me',
            guilds: '/guilds',
            connections: '/connections'
        },
        guilds: {
            base: '/guilds',
            members: '/members'
        }
    }
};

module.exports = { base, version, endpoints };