var data = require('../../data/icons/icons.json')

module.exports = function(q, x, y, s) {
	return '<path d="' + data[q] + '" transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="rgb(54,21,44)"></path>'
}
