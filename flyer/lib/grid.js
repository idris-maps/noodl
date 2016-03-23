module.exports = function(w,h) {
	var w1 = w/3
	var w2 = w/3*2
	return '<g id="grid">'
		+ '<rect x="0" y="0" width="' + w + '" height="' + h + '" style="fill:none;stroke:black"></rect>'
		+ '<line x1="' + w1 + '" y1="0" x2="' + w1 + '" y2="' + h + '" stroke="black"></line>'
		+ '<line x1="' + w2 + '" y1="0" x2="' + w2 + '" y2="' + h + '" stroke="black"></line>'
	+ '</g>'
}
