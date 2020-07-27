const scopes = require('../static/scopes.js');

const resolveScopes = scope => {
    if (!Array.isArray(scope)) scope = [scope];
    scope = scope.filter(s => typeof s === 'string' && s.trim());
    scope = scope.map(s => s.toLowerCase());

    return scope;
};

module.exports = { resolveScopes };