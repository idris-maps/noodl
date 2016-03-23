module.exports = function(d) {
	var r = {type: 'Plats avec du riz', items: []}
	d.forEach(function(t) {
		if(t.type === 'Plats avec du riz') {
			t.items.forEach(function(item) { r.items.push(item) })
		}
	})
	return r
}
