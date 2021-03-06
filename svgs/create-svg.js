var introTxt = require('../data/intro/intro.json')
var data = require('../data/data.json')
var logo = require('../data/logo/logo.json')

var pxPerCm = 118.112111254
var w = Math.round(20 * pxPerCm)
var h = Math.round(19.5  * pxPerCm)

var conf = {
	w: w,
	h: h,
	c: 'rgb(54,21,44)',
	font: {
		title: { fam: 'chivo', s: 100, c: 'rgb(54,21,44)' },
		intro: { fam: 'chivo', s: 50, c: 'rgb(54,21,44)' },
		name: { fam: 'chivo', s: 60, w: 'bold', c: 'rgb(54,21,44)' },
		price: { fam: 'chivo', s: 40, w: 'none', c: 'rgb(54,21,44)' },
		option: { fam: 'chivo', s: 40, w: 'none', c: 'rgb(54,21,44)' },
		descr: { fam: 'chivo', s: 30, w: 'italic', c: 'rgb(54,21,44)' },
		typeDescr: { fam: 'chivo', s: 40, c: 'rgb(54,21,44)' },
		open: { fam: 'chivo', s: 50, w: 'none', c: 'rgb(54,21,44)'}
	}
}

var cover = require('./lib/parts/cover')
cover.start(conf, logo)
cover.end(conf, logo)

var intro = require('./lib/parts/intro')
intro(conf, introTxt)

var menuPage = require('./lib/parts/menu-page')
var marginTop = [250,500,30,100,250,250,200,300,250,100]
data.forEach(function(d, i) {
	var fileName = i + 2
	menuPage(fileName, conf, d, isEven(i), marginTop[i])
})

var lastPage = require('./lib/parts/last-page')
lastPage(conf, '12', true)

function isEven(n) {
	return n == parseFloat(n)? !(n%2) : void 0;
}

