var data = require('./logo.json')

module.exports = function(col1, col2, t) {
	var str = '<g id="logo" transform="' + t + '"><g transform="translate(0,436)">'
	data.forEach(function(path, i) {
		if(path.transform !== undefined) { var tr = ' transform="' + path.transform + '"' } else { tr = '' }
		if(i === 0) { var s = 'fill:' + col1 }
		else if(i === data.length - 1) {
			var s = 'fill:none;stroke:' + col2 + ';stroke-width:3'
		} else {
			var s = 'fill:' + col2
		}
		str = str + '<path id="logo-' + i + '" d="' + path.d + '" ' + tr + '" style="' + s + '"></path>'
	})
	
	return str
}
