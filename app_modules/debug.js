var config = require('./../config/config');
var debugging = typeof config.debug !== 'undefined' ? config.debug : false;

module.exports = function (title, o) {
    if (debugging) {
        console.log(title, o);
    }
    return o;
};