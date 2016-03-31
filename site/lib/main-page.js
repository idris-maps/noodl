var xml = require('./xml')
var logoData = require('../../data/logo/logo.json')
var intro = require('../../data/intro/intro.json')
var open = require('../../data/last/last.json').open
var adr = require('../../data/adr/adr.json')
var map = require('../../data/map/map.json')

module.exports = function(callback) {
	var body = xml.create('div').a({'class': 'menu'})
	logo(body)
	body.c('p').a({'class': 'index-txt'}).d(intro.part1)
	body.c('p').a({'class': 'index-txt'}).d(intro.part2)

	var btns = body.c('div').a({'class': 'menu-btns'})
	btns.c('a').a({href: 'fr.html', alt:'Noodl - Menu en français - Authentic thaï, Eaux-vives, Genève'})
		.c('button').a({id: 'menu-fr', 'class': 'menu-btn'}).d('Menu en français')
	btns.c('a').a({href: 'en.html', alt:'Noodl - Menu in English - Authentic thaï, Eaux-vives, Geneva'})
		.c('button').a({id: 'menu-en', 'class': 'menu-btn'}).d('Menu in english')

	var openTxt = '<strong>' + open.title + '</strong><br>' + open.days + '<br>' + open.lunch + '<br>' + open.dinner
	body.c('p').a({'class': 'index-txt'}).d(openTxt)

	var adrTxt = adr.street + '<br>' + adr.town + '<br><strong>' + adr.tel + '</strong>'
	body.c('p').a({'class': 'index-txt'}).d(adrTxt)

	body.c('br')

	body.c('img').a({'class':'map', src: map.uri})
	body.c('br')
	body.c('br')

	callback(body.outer())

}

function logo(body) {
	var div = body.c('div').a({id: 'logo-img'})
	var svg = div.c('svg').a({viewBox: '0 0 500 500', width: '100%'})
	var g = svg.c('g').a({transform: 'translate(0,435)'})
	logoData.forEach(function(p, ind) {
		var t = ''
		if(ind === 0) { var style = 'fill:rgb(54,21,44)'} 
		else if(ind === logoData.length -1) { var style = 'fill:none;stroke:white;stroke-width:3' }
		else { var style = 'fill:white' }
		if(p.transform !== undefined) { var t = p.transform } 
		g.c('path').a({d: p.d, transform: t, style: style})
	})
}
