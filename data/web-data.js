var fs = require('fs')
var jf = require('jsonfile')
var translation = require('./en-fr.json')

getMenu(function(menuFr) {
	console.log('got menu')
	getIngr(function(ingr) {
		console.log('got ingredients')
		joinMenuIngr('fr', menuFr, ingr, function(fr) {
			console.log('created fr')
			jf.writeFile('data/webdata-fr.json', fr, function() { console.log('wrote webdata-fr.json') })
			translate(menuFr, function(menuEn) {
					console.log('translated menu')
					joinMenuIngr('en', menuEn, ingr, function(en) {
						console.log('created en')
						jf.writeFile('data/webdata-en.json', en, function() { console.log('wrote webdata-en.json') })
				})		
			})			
		})
	})
})

function translate(menu, callback) {
	var menuEn = menu
	menuEn.forEach(function(type) {
		type.type = t(type.type)
		type.items.forEach(function(item) {
			item.name = t(item.name)
			if(item.sizes !== undefined) {
				item.sizes.forEach(function(s) {
					s.size = t(s.size)
				})
			}
			if(item.options !== undefined) {
				item.options.forEach(function(opt) {
					opt.option = t(opt.option)
					if(opt.sizes !== undefined) {
						opt.sizes.forEach(function(s) {
							s.size = t(s.size)
						})
					}
				})
			}
		})
	})
	callback(menuEn)
}

function t(fr) {
	var r = null
	for(i=0;i<translation.length;i++) {
		if(translation[i].fr === fr) {
			r = translation[i].en
		}
	}

	if(r === null) {
		console.log('not translated:', fr)
		r = fr
	}
	return r
}

function joinMenuIngr(lang, menu, ingr, callback) {
	menu.forEach(function(type) {
		type.items.forEach(function(item) {
			if(item.inId !== undefined) {
				item.ingredients = getIngrById(item.inId, lang)
			}
		})
	})
	callback(menu)
	function getIngrById(id, lang) {
		var r = null
		for(i=0;i<ingr.length;i++) {
			if(ingr[i].id === id) {
				if(lang === 'fr') { r = ingr[i].fr }
				else { r = ingr[i].en }
				break			
			}
		}
		return r
	}
}




function getIngr(callback) {
	fs.readdir('data/ingredients', function(err, list) { 
		var all = []
		list.forEach(function(file) {
			var x = jf.readFileSync('data/ingredients/' + file)
			all.push(x)
		})
		callback(all)
	})
}


function getMenu(callback) {
	fs.readdir('data/json', function(err, list) {
		var all = []
		list.forEach(function(file) {
			var x = jf.readFileSync('data/json/' + file)
			all.push(x)
		})
		var uniqType = []
		all.forEach(function(page) {
			var e = false
			for(i=0;i<uniqType.length;i++) {
				if(uniqType[i].type === page.type) {
					e = true
					page.items.forEach(function(item) {
						uniqType[i].items.push(item)
					})
				}
			}
			if(e === false) {
				uniqType.push(page)
			}
		})
		callback(uniqType)
	})
}


