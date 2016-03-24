var bg = require('../bg')
var logo = require('../logo')
var write = require('../write-svg')
var open = require('../../../data/open/open.json')

exports.start = function(conf, logoData) {
	var s = style('open', conf)
	var x = 50
	var y = 2100
	var m = 50
	var inner = bg.even(conf.w,conf.h) + logo(logoData, conf.c, 'scale(4.5) translate(7,5)')
		+ txt(open.title, x, y, s, true)
		+ txt(open.days, x, y + m, s)
		+ txt(open.lunch, x, y + 2*m, s)
		+ txt(open.dinner, x, y + 3*m, s)
	write(conf.w, conf.h, '00', inner)
}

exports.end = function(conf, logoData) {
	var inner = bg.odd(conf.w,conf.h) + logo(logoData, conf.c, 'scale(4.5) translate(20,5)')
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
