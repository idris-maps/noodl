var grid = require('../grid')
var write = require('../write-svg')
var logo = require('../logo')
var icon = require('../icon')
var textFlow = require('../text-flow')
var menuPage = require('../menu-page')
var noodleSoups = require('../data/noodle-soups')
var rices = require('../data/rices')

module.exports = function(conf) {
	var colW = conf.w/3
	var colM = colW/10
	conf.colM = colM
	conf.colW = colW
	col(0, colW, colM, conf, function(part0) {
		col(1, colW, colM, conf, function(part1) {
			col(2, colW, colM, conf, function(part2) {
				var inner =  part0 + part1 + part2 //+ grid(conf.w,conf.h)
				write(conf.w,conf.h,'verso',inner)
			})
		})
	})
}

function col(colI, colW, colM, conf, callback) {
	var x = colI * colW + colM
	var width = colW - colM*2
	if(colI === 0) {
		col1(x,width,conf, function(str) { 
			callback('<g transform="translate(' + x + ',0)">' + str + '</g>')
		})
	} else if(colI === 1) {
		col2(x,width,conf, function(str) { 
			callback('<g transform="translate(' + x + ',0)">' + str + '</g>')
		})
	} else if(colI === 2) {
		col3(x,width,conf, function(str) { 
			callback('<g transform="translate(' + x + ',0)">' + str + '</g>')
		})
	} 
}

function col1(x,y,conf, callback) {
	menuPage(conf.data.menu[0],x,y,conf,0, function(str0) {
		menuPage(conf.data.menu[1],x,y,conf,930, function(str1) {
			menuPage(conf.data.menu[4],x,y,conf,1550, function(str2) {
				callback(str0 + str1 + str2)
			})
		})
	})
}

function col2(x,y,conf,callback) {
	menuPage(rices(conf.data.menu),x,y,conf,800, function(str0) {
		var str1 = logo(conf.data.logo, conf.c, 'translate(150,30) scale(1.3)')
		callback(str0 + str1)
	})
}

function col3(x,y,conf,callback) {
	menuPage(noodleSoups(conf.data.menu),x,y,conf,0, function(str0) {
		var s = style('name', conf)
		var str1 = icon('spicy', 300, 2320, 0.3) 
			+ '<text x="400" y="2355" style="' + s + '">Épicé</text>'
			+ icon('peanuts', 300, 2400, 0.3)
			+ '<text x="400" y="2435" style="' + s + '">Contient des arachides</text>'
		callback(str0 + str1)
	})
}

function style(x, conf) {
	var s = 'font-family:' + conf.font[x].fam + ';'
	+ 'font-size:' + conf.font[x].s + ';'
	+ 'font-weight:' + conf.font[x].w + ';'
	+ 'fill:' + conf.font[x].c + ';'
	if(x === 'price') { s = s + 'text-anchor:end' }
	return s
}
