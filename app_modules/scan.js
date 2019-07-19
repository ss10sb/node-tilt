var Bleacon = require('bleacon');
var debug = require('./debug');
var config = require('../config/tilt');
var Tilt = require('./tilt');
var tilts = typeof config.tilts !== 'undefined' ? config.tilts : {};
var e = {
    callback: function (tilt) {

    },
    scan: Bleacon.startScanning,
};

Bleacon.on('discover', function (bleacon) {
    if (tilts[bleacon.uuid] != null && bleacon.uuid === config.report) {
        e.callback(debug('tilt', new Tilt(bleacon.uuid, tilts[bleacon.uuid], bleacon.major, bleacon.minor, bleacon.rssi)));
    }
});

module.exports = e;