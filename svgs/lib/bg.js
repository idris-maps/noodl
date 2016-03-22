exports.even = function(w,h) {
	return '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="lightgrey"></rect>'
		+ '<circle cx="' + w/2 + '" cy="' + h/2 + '" r="' + w/2 + '" fill="white"></circle>'
		+ '<rect x="0" y="0" width="' + w/2 + '" height="' + h + '" fill="white"></rect>'
}

exports.odd = function(w,h) {
	return '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="lightgrey"></rect>'
		+ '<circle cx="' + w/2 + '" cy="' + h/2 + '" r="' + w/2 + '" fill="white"></circle>'
		+ '<rect x="' + w/2 + '" y="0" width="' + w + '" height="' + h + '" fill="white"></rect>'
}


