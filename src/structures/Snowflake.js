const { splitNumber } = require('../util/splitNumber.js');
const { to, from } = require('../util/binary.js');
const { addBinary } = require('../util/addBinary.js');
const { snowflakeEpoch } = require('../static/constants.js');

class Snowflake {
    constructor(snowflake) {
        const parsed = Snowflake.parse(snowflake);

        this.createdAt = parsed.date;
        this.createdTimestamp = parsed.timestamp;
        this.internalWorkerId = parsed.internalWorkerId;
        this.internalProcessId = parsed.internalProcessId;
        this.increment = parsed.increment;
    }

    static parse(snowflake) {
        const split = splitNumber(snowflake);
        const splitBinary = split.map(to);
        const binary = splitBinary.reduce(addBinary).padStart(64, '0');

        const date = new Date(from(binary.slice(0, 42)) + snowflakeEpoch);
        const timestamp = date.getTime();
        const internalWorkerId = from(binary.slice(42, 47));
        const internalProcessId = from(binary.slice(47, 52));
        const increment = from(binary.slice(52));

        return {
            date,
            timestamp,
            internalWorkerId,
            internalProcessId,
            increment
        };
    }
}

module.exports = { Snowflake };