const splitNumber = number => Array.from(number.toString()).map((d, i, n) => d * (10 ** (n.length - i - 1)));

module.exports = { splitNumber };