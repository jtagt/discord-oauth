const { to, from } = require('../util/base64.js');

class State {
    constructor(state) {
        if (typeof state !== 'object') state = State.parse(state);

        this.return = state.returnUrl;
        this.state = state.state;
    }

    static parse(state) {
        try {
            const parsed = JSON.parse(from(state));

            return {
                returnUrl: parsed[0] || '/',
                state: parsed[1] || null
            };
        }
        catch (e) {
            return { returnUrl: '/', state: null };
        }
    }

    toString() {
        return to(JSON.stringify([this.return, this.state]));
    }
}

module.exports = { State };