var ingrBtns = document.getElementsByClassName('item-name')
for(i=0;i<ingrBtns.length;i++) {
	ingrBtns[i].addEventListener('click', function(e) {
		var id = e.target.id.split('-')[0]
		var div = document.getElementById(id + '-ingr')
		div.style.display = 'block'
		var btn = document.getElementById(id + '-btn')
		btn.onclick = function() {
			div.style.display = 'none'
		}
	})
}
