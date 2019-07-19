var wc = require('wifi-name');
var debug = require('./debug');

module.exports = function() {
    return debug('wifi_status', wc.sync());
};