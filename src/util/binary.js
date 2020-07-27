const to = number => number.toString(2);

const from = binary => parseInt(binary, 2);

module.exports = { to, from };