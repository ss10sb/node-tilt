var ip = require('ip');
var debug = require('./debug');

module.exports = function () {
    return debug('ip', ip.address());
};