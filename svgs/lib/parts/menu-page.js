var bg = require('../bg')
var write = require('../write-svg')
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
		str = str + icon(item.info, x-100, nameY-50, 0.4)
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
		var pXp = conf.w - x
		var pXs = conf.w - x - x*0.5
		var pTxt = ''
		item.sizes.forEach(function(s) {
			lastY = lastY + conf.font.price.s * lineBreak
			str = str 
				+ '<text x="' + pXp + '" y="' + lastY + '" style="' + priceStyle + '">' + s.price + '</text>'
				+ '<text x="' + pXs + '" y="' + lastY + '" style="' + priceStyle + '">' + s.size + '</text>'
		})
		
	}

	if(item.options !== undefined) {
		var optionStyle = style('option', conf)
		var priceStyle = style('price', conf)

		item.options.forEach(function(opt) {
			var pX = conf.w - x
			lastY = lastY + conf.font.option.s * lineBreak
			str = str + '<text x="' + x + '" y="' + lastY + '" style="' + optionStyle + '">' + opt.option + '</text>'



			if(opt.price !== undefined) {
				str = str + '<text x="' + pX + '" y="' + lastY + '" style="' + priceStyle + '">' + opt.price + '</text>'
			}



			if(opt.sizes !== undefined) {

				var sizeName = ''
				for(k=0;k<opt.sizes.length;k++) {
					sizeName = sizeName + opt.sizes[k].size
					if(k !== opt.sizes.length-1) { sizeName = sizeName + ' / ' }
				}
				console.log(opt, sizeName, nameY)
				str = str + '<text x="' + pX + '" y="' + nameY + '" style="' + priceStyle + '">' + sizeName + '</text>'

				var pTxt = ''
				opt.sizes.forEach(function(s, i) {
					pTxt = pTxt + s.price
					if(i !== opt.sizes.length - 1) {
						pTxt = pTxt + ' / '
					}
				})
				var pX = conf.w - x
				str = str + '<text x="' + pX + '" y="' + lastY + '" style="' + priceStyle + '">' + pTxt + '</text>'
			}
		})
	}

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

