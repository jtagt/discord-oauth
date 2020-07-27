const { permissions } = require('../static/permissions.js');

const resolvePermission = permission => {
    if (!Array.isArray(permission)) permission = [permission];
    permission = permission.filter(p => ['string', 'number'].indexOf(typeof p) !== -1);
    permission = permission.map(p => typeof p === 'string' ? p.split(/ +/).join('_').toUpperCase() : p);
    permission = permission.map(p => typeof p === 'string' ? permissions[p] : p);
    permission = permission.filter(p => p && Object.values(permissions).indexOf(p) !== -1);

    return !permission.length ? 0 : permission.reduce((p1, p2) => p1 | p2);
};

module.exports = { resolvePermission };