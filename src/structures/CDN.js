const { cdnOptions } = require('../util/cdnOptions.js');
const { base, guild: { emoji, icon, splash }, accounts: { defaultAvatar, avatar, application } } = require('../static/cdn.js');

class CDN {
    static customEmoji(id, options = {}) {
        return `${base}/${emoji}/${id}${cdnOptions(options)}`;
    }

    static guildIcon(id, hash, options = {}) {
        return `${base}/${icon}/${id}/${hash}${cdnOptions(options)}`;
    }

    static guildSplash(id, hash, options = {}) {
        return `${base}/${splash}/${id}/${hash}${cdnOptions(options)}`;
    }

    static defaultUserAvatar(discrim, options = {}) {
        return `${base}/${defaultAvatar}/${discrim}${cdnOptions(options)}`;
    }

    static userAvatar(id, hash, options = {}) {
        return `${base}/${avatar}/${id}/${hash}${cdnOptions(options, hash.startsWith('a_'))}`;
    }

    static applicationIcon(id, hash, options = {}) {
        return `${base}/${application}/${id}/${hash}${cdnOptions(options)}`;
    }
}

module.exports = { CDN };