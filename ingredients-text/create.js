var fr = require('../data/webdata-fr.json')
var en = require('../data/webdata-en.json')
var fs = require('fs')

go('fr', fr)
go('en', en)



function go(n, d) {
	fs.writeFile(n + '.txt', createTxt(d), 'utf-8', function() { console.log('wrote ' + n) })
} 

function createTxt(d) {
	var str = ''
	d.forEach(function(type) {
		str = str + '\n---' + type.type + '---\n'
		type.items.forEach(function(item) {
			str = str + '\n\t ** ' + item.name + '\n'
			if(item.ingredients !== undefined && item.ingredients !== null) {
				item.ingredients.forEach(function(ingr) {
					str = str + '\t\t\t-' + ingr + '\n'
				})
			}
		})
	})
	return str
}
