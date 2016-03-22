var fs = require('fs')
var jf = require('jsonfile')
var all = []


fs.readdir('data/json', function(err, files) {
	if(err) { console.log(err) }
	else {
		loop(0, files, [], function(all) {
			jf.writeFile('data/data.json', all, function() { console.log('done') })
		})
	}
})

function loop(count, files, all, callback) {
	if(count === files.length) { callback(all) }
	else {
		var file = files[count]
		open(file, function(d) {
			all.push(d)
			count = count + 1
			loop(count, files, all, callback)
		})
	}
}


function open(filename, callback) {
	jf.readFile(__dirname + '/json/' + filename, function(err, json) {
		if(err) { console.log(err) }
		else {
			callback(json)
		}
	})
}
