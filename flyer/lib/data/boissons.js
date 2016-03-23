module.exports = function(d) {
	var r = {type: 'Boissons', items: []}
	d.forEach(function(t) {
		if(t.type === 'Boissons') {
			t.items.forEach(function(item) { r.items.push(item) })
		}
	})
	return r
}
