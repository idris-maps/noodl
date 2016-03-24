var bg = require('../bg')
var write = require('../write-svg')

module.exports = function(conf, n, even) {
	if(even) {
		var inner = bg.even(conf.w,conf.h)
	} else {
		var inner = bg.odd(conf.w,conf.h)
	}
	write(conf.w, conf.h, n, inner)
}
