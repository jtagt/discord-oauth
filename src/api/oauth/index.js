const { token } = require('./token.js');
const { clientCredentials } = require('./clientCredentials.js');
const { revoke } = require('./revoke.js');

module.exports = { oauth: { token, clientCredentials, revoke } };