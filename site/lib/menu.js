var en = require('../../data/webdata-en.json')
var fr = require('../../data/webdata-fr.json')
var xml = require('./xml')
var icon = require('../../data/icons/icons.json')
var mainPage = require('./main-page')

module.exports = function(lang, callback) {
	if(lang === 'fr') { var data = fr } else { var data = en }
	var c = xml.create('div').a({'class': 'menu', id: 'content-' + lang})
	getView(lang, c, data, function(html) {
		callback(html)
	})
}



function getView(lang, c, data, callback) {
	getHead(lang, c)
	data.forEach(function(type, typeIndex) {
		var typeDiv = c.c('div').a({'class': 'type', 'id': 't' + typeIndex})
		typeDiv.c('h1').d(type.type)
		items(type.items, typeIndex, typeDiv)
		typeDiv.c('hr')

		var h = xml.create('div').a({'class': 'header'})
		var pH = h.c('p')
		pH.c('a').a({id: 'back-btn',href:'index.html', alt:'Noodl - Authentic thaï, Eaux-Vives, Genève'})
			.c('span').a({'class': 'header-title', id: 'back'}).d('<')
		pH.c('span').a({'class': 'header-title'}).d('Menu')
		callback(h.outer() + c.outer() + '<br/><br/>')
	})
}

function getHead(lang, c) {
	if(lang === 'fr') { 
		var msg = {
			main: 'Pour voir les ingrédients, cliquez sur le nom du plat',
			spicy: 'Plat épicé',
			pean: 'Contient des arachides'
		}
	} else { 
		var msg = {
			main: 'To see the ingredients, click on the name of the dish',
			spicy: 'Spicy dish',
			pean: 'Contains peanuts'
		}
 }
	var div = c.c('div').a({'class': 'menu-msgs'})
	var info1 = div.c('p').a({'class': 'menu-msg'})
	info1.c('svg').a({'class': 'icon', viewBox:'0 0 170 170'}).c('path').a({d: icon.spicy})
	info1.c('span').d(msg.spicy)
	info1.c('svg').a({'class': 'icon', viewBox:'0 0 170 170'}).c('path').a({d: icon.peanuts})
	info1.c('span').d(msg.pean)
	div.c('p').a({'class': 'menu-msg'}).d(msg.main)
}

function items(items, typeIndex, typeDiv) {
	items.forEach(function(item, itemIndex) {
		var itemDiv = typeDiv.c('div').a({'class': 'item', 'id': 't' + typeIndex + 'i' + itemIndex})
		itemLine(itemDiv, item, typeIndex, itemIndex)
		itemIngr(itemDiv, item, typeIndex, itemIndex)
		itemDescr(itemDiv, item)
		itemSizes(itemDiv, item)
		itemOptions(itemDiv, item)
	})
}

function itemIngr(div, item, typeIndex, itemIndex) {
		if(item.ingredients !== undefined && item.ingredients !== null) {
			var ingrDiv = div.c('div').a({'class': 'ingr', 'id': 't' + typeIndex + 'i' + itemIndex + '-ingr'})
			var head = ingrDiv.c('table').a({'class':'ingr-head'})
			var first = head.c('tr')
			first.c('td').a({'class':'ingr-title'}).d('Ingredients')
			first.c('td').a({'class':'ingr-close right', id: 't' + typeIndex + 'i' + itemIndex + '-btn'}).d('[x]')
			var ingrList = ''
				item.ingredients.forEach(function(ingr, ii) {
					ingrList = ingrList + ingr
					if(ii !== item.ingredients.length -1) {
						ingrList = ingrList + ', '
					}
				})
			ingrDiv.c('p').d(ingrList)
		}
}

function itemOptions(div, item) {
	if(item.options !== undefined) {
		if(item.options[0].sizes === undefined) {
			var t = div.c('table').a({'class':'options-table-simpl'})
			item.options.forEach(function(opt) {
				var tr = t.c('tr')
				tr.c('td').d(opt.option)
				tr.c('td').a({'class': 'opt-price'}).d(opt.price)
			})
		} else {
				var t = div.c('table').a({'class':'options-table'})
				var head = t.c('tr')
				head.c('td').d('')
				head.c('td').a({'class': 'right'}).d(item.options[0].sizes[0].size)
				head.c('td').a({'class': 'right'}).d(item.options[0].sizes[1].size)
				item.options.forEach(function(opt) {
					var tr = t.c('tr')
					tr.c('td').d(opt.option)
					tr.c('td').a({'class':'opt-size-1'}).d(opt.sizes[0].price)
					tr.c('td').a({'class':'opt-size-2'}).d(opt.sizes[1].price)
				})
		}
	}
}

function itemSizes(div, item) {
	if(item.sizes !== undefined) {
		var t = div.c('table').a({'class':'size-table'})
		var line1 = t.c('tr')
		line1.c('td').d(item.sizes[0].size)
		line1.c('td').a({'class': 'size-price'}).d(item.sizes[0].price)
		var line2 = t.c('tr')
		line2.c('td').d(item.sizes[1].size)	
		line2.c('td').a({'class': 'size-price'}).d(item.sizes[1].price)	
	}
}

function itemDescr(div, item) {
	if(item.descr !== undefined) {
		div.c('div').a({'class': item.descr}).d(item.descr)
	}
}


function itemLine(div, item, typeIndex, itemIndex) {
	var line = div.c('div').a({'class': 'name-line'})
	line.c('span').a({'class': 'item-name', id: 't' + typeIndex + 'i' + itemIndex + '-name'}).d(item.name)
	if(item.info !== undefined) {
		var iconName = item.info.n
		if(iconName === 'peanuts') {
			var svg = line.c('svg').a({'class': 'icon', viewBox:'0 0 170 170'})
			svg.c('path').a({d: icon.peanuts})
		}	else if(iconName === 'spicy') {
			var svg = line.c('svg').a({'class': 'icon', viewBox:'0 0 170 170'})
			svg.c('path').a({d: icon.spicy})
		} else {
			var svg = line.c('svg').a({'class': 'icon', viewBox:'0 0 340 170'})
			svg.c('path').a({d: icon.peanuts})
			svg.c('path').a({d: icon.spicy, transform: 'translate(170,0)'})
		}
	}
	if(item.price !== undefined) {
		line.c('span').a({'class': 'name-line-price'}).d(item.price)
	}
}

