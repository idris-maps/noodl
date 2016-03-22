module.exports = function(data, col, t) {
	var str = '<g id="logo" transform="' + t + '"><g transform="translate(0,436)">'
	data.forEach(function(path, i) {
		if(path.transform !== undefined) { var tr = ' transform="' + path.transform + '"' } else { tr = '' }
		if(i === 0) { var s = 'fill:' + col }
		else if(i === data.length - 1) {
			var s = 'fill:none;stroke:white;stroke-width:3'
		} else {
			var s = 'fill:white'
		}
		str = str + '<path id="logo-' + i + '" d="' + path.d + '" ' + tr + ' style="' + s + '"></path>'
	})
	
	return str + '</g></g>'
}
