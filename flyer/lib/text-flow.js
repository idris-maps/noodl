module.exports = function(x,y,s,txt,n,size) {
	var l = lines(txt, n)
	var lastY = y
	var str = ''
	l.forEach(function(line) {
		lastY = lastY + size
		str = str + '<text x="' + x + '" y="' + lastY + '" style="' + s + ';text-anchor:middle">' + line + '</text>'
	})
	return {str:str, y:lastY}
}

function lines(txt, n) {
	var s = txt.split(' ')
	var count = 0
	var part = ''
	var parts = []
	for(i=0;i<s.length;i++) {
		var x = count + s[i].length
		if(x > n) {
			parts.push(part.trim())
			part = s[i] + ' '
			count = s[i].length + 1
			if(i === s.length - 1) {
				//part = part + s[i]
				parts.push(part.trim())
			}
		} else {
			if(i === s.length - 1) {
				part = part + s[i]
				parts.push(part.trim())
			} else {
				part = part + s[i] + ' '
				count = count + s[i].length
			}
		}
	}
	return parts
}
