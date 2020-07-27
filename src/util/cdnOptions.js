const { sizes, formats } = require('../static/cdn.js');

const cdnOptions = ({ format = 'png', size = 128 } = {}, allowGif = false) => {
    const options = {};
    format = format.toLowerCase();

    options.size = sizes.indexOf(size) !== -1 ? size : 128;
    options.format = formats.indexOf(format) !== -1 && (format === 'gif' ? allowGif : true) ? format : 'png';

    return `.${options.format}?size=${options.size}`;
};

module.exports = { cdnOptions };