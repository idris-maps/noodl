module.exports = function(d) {
	var r = {type: 'Nouilles en soupe', items: []}
	d.forEach(function(t) {
		if(t.type === 'Nouilles en soupe') {
			t.items.forEach(function(item) { r.items.push(item) })
		}
	})
	return r
}
