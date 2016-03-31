var grid = require('../grid')
var write = require('../write-svg')
var logo = require('../logo')
var intro = require('../../../data/intro/intro.json')
var adr = require('../../../data/adr/adr.json')
var open = require('../../../data/open/open.json')
var last = require('../../../data/last/last.json')
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
	var s2 = 'font-family:chivo;font-size:30;fill:rgb(54,21,44);text-anchor:middle'
	var s3 = 'font-family:chivo;font-size:50;font-weight:bold;fill:rgb(54,21,44);text-anchor:middle'
	var y = 1600
	var M = 60
	var X = conf.colW/2 - conf.colM
	var str = '<text x="' + X + '" y="' + y + '" style="' + s + ';text-anchor:middle">' + adr.street + '</text>'
	+ '<text x="' + X + '" y="' + getY(1) + '" style="' + s + ';text-anchor:middle">' + adr.town + '</text>'
	+ '<text x="' + X + '" y="' + getY(3) + '" style="' + s + ';text-anchor:middle">' + adr.tel + '</text>'
	+ '<text x="' + X + '" y="' + getY(6) + '" style="' + s + ';text-anchor:middle">' + open.title + '</text>'
	+ '<text x="' + X + '" y="' + getY(7) + '" style="' + s + ';text-anchor:middle">' + open.days + '</text>'
	+ '<text x="' + X + '" y="' + getY(8) + '" style="' + s + ';text-anchor:middle">' + open.lunch + '</text>'
	+ '<text x="' + X + '" y="' + getY(9) + '" style="' + s + ';text-anchor:middle">' + open.dinner + '</text>'
	+ '<text x="' + X + '" y="' + getY(11.2) + '" style="' + s2 + '">' + last.site.fr + '</text>'
	+ '<text x="' + X + '" y="' + getY(12) + '" style="' + s2 + '">' + last.site.en + '</text>'
	+ '<text x="' + X + '" y="' + getY(13.5) + '" style="' + s3 + '">' + last.site.www + '</text>'

	return str + logo(conf.data.logo, conf.c, 'translate(-35,350) scale(2)')
	function getY(n) { return y + M * n }
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
	menuPage(boissons(conf.data.menu),x,y,conf,200, function(str0) {
		callback(str0)
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
