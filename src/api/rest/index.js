const { connections } = require('./connections.js');
const { guilds } = require('./guilds.js');
const { info } = require('./info.js');
const { joinGuild } = require('./joinGuild.js');

module.exports = { rest: { connections, guilds, info, joinGuild } };