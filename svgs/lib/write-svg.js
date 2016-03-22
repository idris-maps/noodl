var fs = require('fs')

module.exports = function(w,h,name, inner) {

	var pageHTML = html(w,h, inner)
	writeHTML(name, pageHTML)

	var pageSVG = svg(w,h, inner)
	writeSVG(name, pageSVG)
}

function writeSVG(name, svg) {
	fs.writeFile('svgs/svg/' + name + '.svg', svg, 'utf-8', function() { console.log('wrote ' + name + '.svg') })
}

function writeHTML(name, html) {
	fs.writeFile('svgs/html/' + name + '.html', html, 'utf-8', function() { console.log('wrote ' + name + '.html') })
}

function html(w,h,inner) {
	return '<html><meta charset="utf-8">'
		+ '<svg width="1000" viewBox="0 0 '+ w +' '+ h +'">'
		+ inner
		+ '</svg>'
}

function svg(w,h, inner) {
	return '<svg width="' + w + '" height="' + h + '">'
		+ inner
		+ '</svg>'
}
