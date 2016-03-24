var bg = require('../bg')
var write = require('../write-svg')
var icon = require('../icon')

module.exports = function(conf, data) {
	var inner = bg.odd(conf.w, conf.h) + intro(conf, data)
	write(conf.w, conf.h, '01', inner)
}

function intro(conf, data) {
	var f = conf.font.intro
	var spX = conf.w/2 - 300
	var g = '<g id="text" '
	+ 'style="font-family:' + f.fam + ';font-size:' + f.s + ';" '
	+ 'transform="translate(0, 200)" >'
		+ text(data.part1, conf.w/2, 250, f.s, f.c)
		+ text(data.part2, conf.w/2, 670, f.s, f.c)
		+ text(data.part3, conf.w/2, 970, f.s, f.c)
		+ icon('spicy', spX-150, 1440, 0.5)
		+ '<text x="' + spX + '" y="1500" fill="' + f.c + '" font-weight="bold">Plat épicé</text>'
		+ icon('peanuts', spX-150, 1540, 0.5)
		+ '<text x="' + spX + '" y="1600" fill="' + f.c + '" font-weight="bold">Plat contenant des arachides</text>'
	+ '</g>'

	return g
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
