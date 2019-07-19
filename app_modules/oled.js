var font = require('oled-font-5x7');
var oled = require('oled-i2c-bus');
var i2c = require('i2c-bus');
var debug = require('./debug');
var config = require('./../config/oled');

var spacing = {
    column: 1,
    row: 2
};

var i2cbus = i2c.openSync(typeof config.device_id !== 'undefined' ? config.device_id : 1);

var oled = new oled(i2cbus, config);

var write = function (text, row, col, size, wrap)
{
    wrap = typeof wrap !== 'undefined' ? wrap : true;
    size = typeof size !== 'undefined' ? size : 1;
    col = typeof col !== 'undefined' ? col : 1;
    row = calc.row(row, size);
    col = calc.column(col, size);
    var fits = calc.fits(text, row, col, size);
    if (fits.x && fits.y) {
        oled.setCursor(calc.col_to_x(col, size), calc.row_to_y(row, size));
        oled.writeString(font, size, text, 1, wrap);
    }
};

var writeRight = function (text, row, size, wrap)
{
    size = typeof size !== 'undefined' ? size : 1;
    var col = calc.columns(size) - calc.text_columns(text, size);
    return write(text, row, col, size, wrap);
};

var clear = function(x1, y1, x2, y2)
{
    if (typeof x1 === 'undefined' && typeof y1 === 'undefined') {
        oled.clearDisplay();
    } else {
        x2 = typeof x2 !== 'undefined' ? x2 : config.width;
        y2 = typeof y2 !== 'undefined' ? y2 : config.height;
        oled.fillRect(x1, y1, x2, y2, 0);
    }
};

var calc = {
    text_width: function (text, size) {
        return debug('text_width', text.length * calc.char_width(size));
    },
    text_columns: function (text, size) {
        return debug('text_columns', text.length/* + (text.length * spacing.column)*/);
    },
    char_height: function (size) {
        size = typeof size !== 'undefined' ? size : 1;
        return debug('char_height', parseInt(font.height) * size + spacing.row);
    },
    char_width: function (size) {
        size = typeof size !== 'undefined' ? size : 1;
        return debug('char_width', parseInt(font.width) * size + spacing.column);
    },
    columns: function (size) {
        size = typeof size !== 'undefined' ? size : 1;
        return debug('columns', Math.floor(parseInt(config.width)/calc.char_width(size)));
    },
    rows: function (size) {
        size = typeof size !== 'undefined' ? size : 1;
        return debug('rows', Math.floor(parseInt(config.height)/calc.char_height(size)));
    },
    fits: function (text, row, col, size, wrap) {
        wrap = typeof wrap !== 'undefined' ? wrap : true;
        var textcolumns = calc.text_columns(text, size);
        var colsavailable = debug('colsavailable', calc.columns(size) - col);
        var needswrap = textcolumns > colsavailable;
        var xfits = debug('xfits', needswrap || wrap === true);
        var textrows = debug('textrows', needswrap ? Math.ceil(textcolumns/colsavailable) : 1);
        var rowsavailable = debug('rowsavailable', calc.rows(size) - row);
        var yfits = debug('yfits', rowsavailable >= textrows);
        return {x: xfits, y: yfits};
    },
    column: function (col_num, size) {
        if (col_num <= 1) {
            col = 1;
        }
        if (col_num >= calc.columns(size)) {
            col_num = calc.columns(size) - 1;
        }
        return debug('column', col_num);
    },
    row: function (row_num, size) {
        if (row_num <= 1) {
            row = 1;
        }
        if (row_num > calc.rows(size)) {
            row_num = calc.rows(size);
        }
        return debug('row', row_num);
    },
    col_to_x: function (col, size) {
        var x = 1;
        if (col > 1) {
            x = col * calc.char_width(size);
        } 
        return debug('x', x);
    },
    row_to_y: function (row, size) {
        var ch = calc.char_height(size);
        var y = 1;
        if (row > 1) {
            y = row * ch - ch;
        }
        return debug('y', y);
    }
};

module.exports = {
    clear: clear,
    write: write,
    right: writeRight,
};