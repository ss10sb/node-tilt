var moment = require('moment');

class Tilt 
{
    constructor(uuid, color, temp, gravity, rssi)
    {
        this.uuid = uuid;
        this.color = color;
        this.temp = parseFloat(temp);
        this.gravity = parseFloat(gravity/1000);
        this.rssi = rssi;
        this.timestamp = moment();
    }
}

module.exports = Tilt;