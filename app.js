var oled = require('./app_modules/oled');
var ip = require('./app_modules/ip');
var wifi = require('./app_modules/wifi');
var scanner = require('./app_modules/scan');
var config = require('./config/config');

scanner.callback = function (tilt) {
    oled.clear(0, 9);
    oled.write(tilt.color + ' [pre-cal]', 3, 1);
    oled.write('Temp: ' + tilt.temp, 4, 1);
    oled.write('Gravity: ' + tilt.gravity, 5, 1);
    oled.write(tilt.timestamp.format(typeof config.date_format !== 'undefined' ? config.date_format : "M/D/YY HH:mm:ss"), 6, 1);
    oled.write(tilt.rssi, 7, 1);
};

var static = function () {
    oled.clear();
    oled.write(wifi().length > 0 ? 'W+' : 'w-', 1, 1);
    oled.right(ip(), 1);
};

static();

setInterval(static, typeof config.static_timer !== 'undefined' ? config.static_timer : 30 * 1000);

scanner.scan();

