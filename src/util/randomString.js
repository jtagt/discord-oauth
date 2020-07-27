const randomString = (length = 10, characters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890') => Array(length).fill(null).map(() => characters[Math.floor(Math.random() * characters.length)]).join('');

module.exports = { randomString };