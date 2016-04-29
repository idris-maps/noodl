var bg = require('../bg')
var write = require('../write-svg')
var adr = require('../../../data/adr/adr.json')
var icon = require('../icon')
var lineBreak = 1.5

module.exports = function(n, conf, data, even, marginTop) {
	if(n < 10) { var fileName = '0' + n } else { var fileName = n } 
	menu(conf, data, marginTop, function(str) {
		if(even) {
			var inner = bg.even(conf.w, conf.h) + str
		} else {
			var inner = bg.odd(conf.w, conf.h) + str
		}

// adresse sur dernière page
		if(n === 11) {
			var adrStyle = "font-family:chivo;font-size:30px;text-anchor:middle;fill:rgb(54,21,44)"
			var adrY = 2050
			var adrM = 35
   inner = inner 
				+ '<text x="' + conf.w/2 + '" y="' + adrY + '" style="' + adrStyle + '">NOODL.ch</text>'
				+ '<text x="' + conf.w/2 + '" y="' + (adrY + adrM) + '" style="' + adrStyle + '">' + adr.street + '</text>'
				+ '<text x="' + conf.w/2 + '" y="' + (adrY + adrM*2) + '" style="' + adrStyle + '">' + adr.town + '</text>'
				+ '<text x="' + conf.w/2 + '" y="' + (adrY + adrM*3) + '" style="' + adrStyle + '">' + adr.tel + '</text>'
		}

		write(conf.w, conf.h, fileName, inner)
	})
}

function menu(conf, data, marginTop, callback) {
	var c = conf.c
	var fT = conf.font.title
	var sT = 'font-family:' + fT.fam + ';font-size:' + fT.s + ';text-anchor:middle;font-weight:bold;fill:' + c
	var tY = 250
	var wC = conf.w / 2
	var str = '<text x="' + wC + '" y="' + tY + '" style="' + sT + '">' + data.type + '</text>'
	if(data.typeDescr !== undefined) {
		tY = tY + conf.font.typeDescr.s * lineBreak
		str = str + '<text x="' + wC + '" y="' + tY + '" style="' + style('typeDescr', conf) + ';text-anchor:middle">' + data.typeDescr + '</text>'
	}
	var lastY = tY + marginTop
	plates(conf, data.items, lastY, function(lastY, menuStr) {
		str = str + menuStr
		callback(str)
	})
	return str	
}

function plates(conf, items, lastY, callback) {
	var m = conf.w/4
	pLoop(0, items, m, lastY, '', conf, function(lastY, str) {
		callback(lastY, str)
	})
}

function pLoop(count, items, x, lastY, str, conf, callback) {
	if(count === items.length) {
		callback(lastY, str)
	} else {
		var item = items[count]
		lastY = lastY + 50
		var r = onePlate(item, x, lastY, str, conf)
		count = count + 1
		pLoop(count, items, x, r.lastY, r.str, conf, callback)
	}
}

function onePlate(item, x, lastY, str, conf) {
	var nameStyle = style('name', conf)
	lastY = lastY + conf.font.name.s * lineBreak
	var nameY = lastY
	var pX = conf.w - x
	str = str + '<text x="' + x + '" y="' + lastY + '" style="' + nameStyle + '">' + item.name + '</text>'

	if(item.info !== undefined) {

		if(item.info.n === 'peanuts') {
			str = str + icon('peanuts', x+400+item.info.x ,nameY-50, 0.3)
		} else if(item.info.n === 'spicy') {
			str = str + icon(item.info.n, x+400+item.info.x, nameY-50, 0.3)
		} else if(item.info.n === 'peanuts + spicy') {
			str = str + icon('spicy', x+400+item.info.x ,nameY-50, 0.3) + icon('peanuts', x+450+item.info.x, nameY-50, 0.3)
		} else if(item.info.n === 'extra spicy') {
			str = str + icon('spicy', x+400+item.info.x ,nameY-50, 0.3) + icon('spicy', x+450+item.info.x, nameY-50, 0.3)
		}
	}

	if(item.price !== undefined) {
		var priceStyle = style('price', conf)
		str = str + '<text x="' + pX + '" y="' + lastY + '" style="' + priceStyle + '">' + item.price + '</text>'
	}

	if(item.descr !== undefined) {
		var descrStyle = style('descr', conf)
		lastY = lastY + conf.font.descr.s * lineBreak
		str = str + '<text x="' + x + '" y="' + lastY + '" style="' + descrStyle + '">' + item.descr + '</text>'
	}

	if(item.sizes !== undefined) {
		var priceStyle = style('price', conf)

		var colX2 = pX
		var colX1 = pX -200

// Size NAME
		lastY = lastY + conf.font.price.s * lineBreak
		var size1name = item.sizes[0].size
		var size2name = item.sizes[1].size
		str = str 
			+ '<text x="' + colX1 + '" y="' + lastY + '" style="' + priceStyle + '">' + size1name + '</text>'
			+ '<text x="' + colX2 + '" y="' + lastY + '" style="' + priceStyle + '">' + size2name + '</text>'
// Size PRICE
		lastY = lastY + conf.font.price.s * lineBreak
		var size1price = item.sizes[0].price
		var size2price = item.sizes[1].price
		str = str 
			+ '<text x="' + colX1 + '" y="' + lastY + '" style="' + priceStyle + '">' + size1price + '</text>'
			+ '<text x="' + colX2 + '" y="' + lastY + '" style="' + priceStyle + '">' + size2price + '</text>'


	}

	if(item.options !== undefined) {
		var optionStyle = style('option', conf)
		var priceStyle = style('price', conf)

// Size NAMES
		if(item.options[0].sizes !== undefined) {
				lastY = lastY + conf.font.price.s * lineBreak
				var colX2 = pX
				var colX1 = pX -200
				var size1name = item.options[0].sizes[0].size
				var size2name = item.options[0].sizes[1].size
				str = str 
					+ '<text x="' + colX1 + '" y="' + lastY + '" style="' + priceStyle + '">' + size1name + '</text>'
					+ '<text x="' + colX2 + '" y="' + lastY + '" style="' + priceStyle + '">' + size2name + '</text>'
		}

		item.options.forEach(function(opt) {
			var pX = conf.w - x
			lastY = lastY + conf.font.option.s * lineBreak
			str = str + '<text x="' + x + '" y="' + lastY + '" style="' + optionStyle + '">' + opt.option + '</text>'



			if(opt.price !== undefined) {
				str = str + '<text x="' + pX + '" y="' + lastY + '" style="' + priceStyle + '">' + opt.price + '</text>'
			}


// Size PRICES
			if(opt.sizes !== undefined) {
				var size1name = opt.sizes[0].price
				var size2name = opt.sizes[1].price
				str = str 
					+ '<text x="' + colX1 + '" y="' + lastY + '" style="' + priceStyle + '">' + size1name + '</text>'
					+ '<text x="' + colX2 + '" y="' + lastY + '" style="' + priceStyle + '">' + size2name + '</text>'
			}


		})
	}
/* INFO ALLERGIES
	str = str 
		+ '<text x="1300" y="2100" style="font-family:chivo;font-size:30px;text-anchor:middle;fill:rgb(54,21,44)">' + alerg.txt1 + '</text>'
		+ '<text x="1300" y="2130" style="font-family:chivo;font-size:30px;text-anchor:middle;fill:rgb(54,21,44)">' + alerg.txt2 + '</text>'
*/

	return {
		lastY: lastY,
		str: str
	}
}

function style(x, conf) {
	var s = 'font-family:' + conf.font[x].fam + ';'
	+ 'font-size:' + conf.font[x].s + ';'
	+ 'font-weight:' + conf.font[x].w + ';'
	+ 'fill:' + conf.font[x].c + ';'
	if(x === 'price') { s = s + 'text-anchor:end' }
	return s
}

/*

function onePlate(p, i, conf, x, y) {
	console.log(p)
	var nameF = conf.font.name
	var nameStyle = 'font-family:' + nameF.fam + ';font-size:' + nameF.s
	var str = '<g id="plate-' + i + '" transform="translate(' + x + ',' + y + ')">'
		+ '<text style="' + nameStyle + '">' + p.name + '</text>'
	+ '</g>'
	return str
}
*/

