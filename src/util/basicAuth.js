const { to } = require('./base64.js');

const basicAuth = (...userPass) => `Basic ${to(userPass.join(':'))}`;

module.exports = { basicAuth };