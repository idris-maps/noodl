var bg = require('../bg')
var write = require('../write-svg')
var data = require('../../../data/last/last.json')

module.exports = function(conf, n, even) {
	if(even) {
		var inner = bg.even(conf.w,conf.h)
	} else {
		var inner = bg.odd(conf.w,conf.h)
	}

	var s = style('open', conf) + 'text-anchor:middle'
	var x = 1300
	var y = 900
	var m = 50

	inner = inner 
		+ txt(data.open.title, x, y, s)
		+ txt(data.open.days, x, y + m, s)
		+ txt(data.open.lunch, x, y + 2*m, s)
		+ txt(data.open.dinner, x, y + 3*m, s)
		+ txt(data.site.fr, x, y + 5*m, s)
		+ txt(data.site.en, x, y + 6*m, s)
		+ txt(data.site.www, x, y + 8*m, 'font-family:chivo;font-size:80px;fill:rgb(54,21,44);text-anchor:middle')
		+ txt('Nous acceptons les cartes de débit, VISA et MasterCard', x, y + 10*m, s)
	write(conf.w, conf.h, n, inner)
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
