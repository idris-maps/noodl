var introTxt = require('../data/intro/intro.json')
var data = require('../data/data.json')
var logo = require('../data/logo/logo.json')

var w = 3508
var h = 2480

var conf = {
	w: w,
	h: h,
	c: 'rgb(54,21,44)',
	font: {
		title: { fam: 'chivo', s: 70, c: 'rgb(54,21,44)' },
		intro: { fam: 'chivo', s: 40, c: 'rgb(54,21,44)' },
		name: { fam: 'chivo', s: 30, w: 'bold', c: 'rgb(54,21,44)' },
		price: { fam: 'chivo', s: 20, w: 'none', c: 'rgb(54,21,44)' },
		option: { fam: 'chivo', s: 20, w: 'none', c: 'rgb(54,21,44)' },
		descr: { fam: 'chivo', s: 20, w: 'italic', c: 'rgb(54,21,44)' },
		adr: { fam: 'chivo', s: 70, w: 'bold', c: 'rgb(54,21,44)' }
	},
	data: {
		logo: logo,
		menu: data
	}
}



var recto = require('./lib/parts/recto')
recto(conf)

var verso = require('./lib/parts/verso')
verso(conf)

