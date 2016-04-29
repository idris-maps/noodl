var bg = require('../bg')
var write = require('../write-svg')
var icon = require('../icon')
var last = require('../../../data/last/last.json')
var adr = require('../../../data/adr/adr.json')

module.exports = function(conf, data) {
	var inner = bg.odd(conf.w, conf.h) + intro(conf, data, last)
	write(conf.w, conf.h, '01', inner)
}

function intro(conf, data, last) {
	var s = lastStyle('open', conf) + 'text-anchor:middle'
	var lastX = conf.w/2
	var lastY = 750
	var lastM = 50

	var f = conf.font.intro
	var spX = conf.w/2 - 300
	var g = '<g id="text" '
	+ 'style="font-family:' + f.fam + ';font-size:' + f.s + ';" '
	+ 'transform="translate(0, 200)" >'
		+ text(data.part1, conf.w/2, 130, f.s, f.c)
		+ text(data.part2, conf.w/2, 300, f.s, f.c)
	//	+ text(data.part3, conf.w/2, 570, f.s, f.c)
		+ text(data.part4, conf.w/2, 470, f.s, f.c)
		+ lastTxt(last.open.title, lastX, lastY, s)
		+ lastTxt(last.open.days, lastX, lastY + lastM, s)
		+ lastTxt(last.open.lunch, lastX, lastY + 2*lastM, s)
		+ lastTxt(last.open.dinner, lastX, lastY + 3*lastM, s)
		+ lastTxt(last.site.enSimpl, lastX, lastY + 5.5*lastM, s)
		+ lastTxt(last.site.www, lastX, lastY + 7.5*lastM, 'font-family:chivo;font-size:80px;fill:rgb(54,21,44);text-anchor:middle')
		+ lastTxt(adr.street, lastX, lastY + 10*lastM, s)
		+ lastTxt(adr.town, lastX, lastY + 11*lastM, s)
		+ lastTxt(adr.tel, lastX, lastY + 13*lastM, s)
		+ text(data.part5, conf.w/2, lastY + 15*lastM, f.s, f.c)
		+ icon('spicy', spX-150, 1650, 0.4)
		+ '<text x="' + spX + '" y="1690" fill="' + f.c + '" font-weight="bold">Plat épicé</text>'
		+ icon('peanuts', spX-150, 1750, 0.4)
		+ '<text x="' + spX + '" y="1790" fill="' + f.c + '" font-weight="bold">Plat contenant des arachides</text>'
	+ '</g>'

	return g
}

function lastStyle(x, conf) {
	var s = 'font-family:' + conf.font[x].fam + ';'
	+ 'font-size:' + conf.font[x].s + ';'
	+ 'fill:' + conf.font[x].c + ';'
	return s
}

function lastTxt(text, x, y, s, bold) {
	if(bold) { s = s 	+ 'font-weight:bold;' }
	return '<text x="' + x + '" y="' + y + '" style="' + s + '">' + text + '</text>'
}


function text(txt, x, y, s, c) {
	var dy = y
	var parts = partTxt(txt, 30)
	var str = ''
	parts.forEach(function(p) {
		str = str + '<text x="' + x + '" y="' + dy + '" text-anchor="middle" fill="' + c + '">' + p + '</text>'
		dy = dy + s
	})
	return str
}

function partTxt(txt, n) {
	var p = txt.split(' ')
	var nb = 0
	var part = ''
	var parts = []
	for(i=0;i<p.length;i++) {
		nb = nb + p[i].length 
		if(nb > n) {
			parts.push(part)
			part = p[i] + ' '
			nb = 0
		} else {
			part = part + p[i] + ' '
		}
		if(i === p.length - 1) {
			parts.push(part)
		}
	}
	return parts
}

/*

<flowRoot
       xml:space="preserve"
       id="flowRoot3089"
       style="font-size:16px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans"
       transform="translate(19.71875,334.88681)">
   <flowRegion id="flowRegion3091">
        <rect id="rect3093" width="50.78125" height="75" x="34.765625" y="155.89932"/>
   </flowRegion>

    <flowPara id="flowPara3123">Item 1</flowPara>
    <flowPara id="flowPara3137">Item 2</flowPara>
    <flowPara id="flowPara3139">Item 3</flowPara>
</flowRoot>

*/
