var bg = require('../bg')
var logo = require('../logo')
var write = require('../write-svg')


exports.start = function(conf, logoData) {

	var inner = bg.even(conf.w,conf.h) + logo(logoData, conf.c, 'scale(4.5) translate(7,5)')
	write(conf.w, conf.h, '00', inner)
}

exports.end = function(conf, logoData) {
	var inner = bg.odd(conf.w,conf.h) //+ logo(logoData, conf.c, 'scale(4.5) translate(20,5)')
	write(conf.w, conf.h, '13', inner)
}

function style(x, conf) {
	var s = 'font-family:' + conf.font[x].fam + ';'
	+ 'font-size:' + conf.font[x].s + ';'
	+ 'fill:' + conf.font[x].c + ';'
	return s
}

function txt(text, x, y, s, bold) {
	if(bold) { s = s 	+ 'font-weight:bold;' }
	return '<text x="' + x + '" y="' + y + '" style="' + s + '">' + text + '</text>'
}
