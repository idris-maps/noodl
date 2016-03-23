var grid = require('../grid')
var write = require('../write-svg')
var logo = require('../logo')
var intro = require('../../../data/intro/intro.json')
var adr = require('../../../data/adr/adr.json')
var map = require('../../../data/map/map.json').uri
var textFlow = require('../text-flow')
var menuPage = require('../menu-page')
var boissons = require('../data/boissons')

module.exports = function(conf) {
	var colW = conf.w/3
	var colM = colW/10
	conf.colM = colM
	conf.colW = colW
	col(0, colW, colM, conf, function(part0) {
		col(1, colW, colM, conf, function(part1) {
			col(2, colW, colM, conf, function(part2) {
				var inner = part0 + part1 + part2 //+ grid(conf.w,conf.h)
				write(conf.w,conf.h,'recto',inner)
			})
		})
	})
}

function col(colI, colW, colM, conf, callback) {
	var x = colI * colW + colM
	var width = colW - colM*2
	if(colI === 2) {
		callback('<g transform="translate(' + x + ',0)">' + col3(x,width,conf) + '</g>')
	} else if(colI === 0) {
		col1(x,width,conf, function(str) { 
			callback('<g transform="translate(' + x + ',0)">' + str + '</g>')
		})
	} else if(colI === 1) {
		callback('<g transform="translate(' + x + ',0)">' + col2(x,width,conf) + '</g>')
	} 
}

function col3(x,w,conf) {
	var s = style('adr', conf)
	var Y = 2000
	var M = 100
	var Y1 = Y+M
	var Y2 = Y+M*3
	var Y3 = Y+M*4
	var X = conf.colW/2 - conf.colM
	var str = '<text x="' + X + '" y="' + Y + '" style="' + s + ';text-anchor:middle">' + adr.street + '</text>'
	+ '<text x="' + X + '" y="' + Y1 + '" style="' + s + ';text-anchor:middle">' + adr.town + '</text>'
	+ '<text x="' + X + '" y="' + Y2 + '" style="' + s + ';text-anchor:middle">' + adr.tel + '</text>'
	+ '<text x="' + X + '" y="' + Y3 + '" style="' + s + ';text-anchor:middle">' + adr.www + '</text>'
	return str + logo(conf.data.logo, conf.c, 'translate(-35,350) scale(2)')
}

function col2(x,w,conf) {
	var s = style('intro', conf)
	var startY = 900
	var marg = 50
	var p1 = textFlow(w/2,startY,s,intro.part1,40,conf.font.intro.s)
	var p2 = textFlow(w/2,p1.y + marg,s,intro.part2,40,conf.font.intro.s)
	var p3 = textFlow(w/2,p2.y + marg,s,intro.part3,40,conf.font.intro.s)
	var img = '<image width="954" height="599" xlink:href="' + map + '" transform="translate(-10,1800)"></image>'
	return p1.str + p2.str + p3.str + logo(conf.data.logo, conf.c, 'translate(210,210) scale(1)') + img
}

function col1(x,y,conf, callback) {
	menuPage(boissons(conf.data.menu),x,y,conf,700, function(str0) {
		menuPage(conf.data.menu[8],x,y,conf,0, function(str1) {
			callback(str0 + str1)
		})
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
