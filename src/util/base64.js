const to = text => Buffer.from(text, 'utf8').toString('base64');

const from = base64 => Buffer.from(base64, 'base64').toString('utf8');

module.exports = { to, from };