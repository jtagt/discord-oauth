const sizes = [16, 32, 64, 128, 256, 512, 1024, 2048];
const formats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

const base = 'https://cdn.discordapp.com';

const guild = {
    emoji: 'emojis',
    icon: 'icons',
    splash: 'splashes'
};

const accounts = {
    defaultAvatar: 'embed/avatars',
    avatar: 'avatars',
    application: 'app-icons'
};

module.exports = {
    sizes, formats,
    base, guild, accounts
};