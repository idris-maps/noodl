var fs = require('fs')
var html = require('./lib/html')
var mainPage = require('./lib/main-page')
var menuPage = require('./lib/menu')
var c = 1
fs.readFile('site/public/style.min.css', 'utf-8', function(err, style) {
	if(err) { console.log(err) }
	console.log(style)
	menu('fr', style, function() {
		menu('en', style, function() {
			main(style)
			console.log('done')
		})
	})

})

function menu(lang, style, callback) {
	fs.readFile('site/public/ingredients.min.js', 'utf-8', function(err, script) {
		if(err) { console.log(err) }
		menuPage(lang, function(pageMenu) {
			var page = html.start 
				+ style 
				+ html.afterStyle
				+ pageMenu 
				+ html.afterHtml
				+ script
				+ html.afterScript
			fs.writeFile('site/' + lang + '.html', page, 'utf-8', function(err) {
				if(err) { console.log(err) }
				else { callback() }
			})
		})
	})
}

function main(style) {
	mainPage(function(pageIndex) {
		var page = html.start 
			+ style 
			+ html.afterStyle
			+ pageIndex 
			+ html.afterHtml
			+ html.afterScript
		fs.writeFile('site/index.html', page, 'utf-8', function(err) {
			if(err) { console.log(err) }
		})
	})
}






