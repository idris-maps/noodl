var bg = require('../bg')
var logo = require('../logo')
var write = require('../write-svg')

exports.start = function(conf, logoData) {
	var inner = bg.even(conf.w,conf.h) + logo(logoData, conf.c, 'scale(4.5) translate(7,5)')
	write(conf.w, conf.h, '00', inner)
}

exports.end = function(conf, logoData) {
	var inner = bg.odd(conf.w,conf.h) + logo(logoData, conf.c, 'scale(4.5) translate(20,5)')
	write(conf.w, conf.h, '13', inner)
}
