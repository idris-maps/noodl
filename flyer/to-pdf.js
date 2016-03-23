var exec = require('child_process').exec
var fs = require('fs')

fs.readdir(__dirname + '/svg', function(err, svgs) {
	if(err) { console.log(err) }
	else { 
		loop(0, svgs, [], function(list) { 
			unite(svgs, function() { 
				console.log('done') 
			}) 
		})
	}
})

function unite(list, callback) {
	var cmd = 'pdfunite '
	list.forEach(function(item, index) {
		var n = item.split('.')[0]
		cmd = cmd + n + '.pdf '
	})
	cmd = cmd + 'noodl-flyer.pdf'
/*
	exec('ls', function (error, stdout, stderr) {  
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			console.log('wrote noodl.pdf')
		}
		callback()
	})
*/
	console.log(cmd)

}

function loop(count, svgs, list, callback) {
	if(count === svgs.length) { callback() }
	else {
		var n = svgs[count].split('.')[0]
		fileToPdf(n, function() {
			setTimeout(function() {
				count = count + 1
				list.push(n)
				loop(count, svgs, list, callback)
			},10)
		})
	}
}

function fileToPdf(n, callback) {
	var cmd = 'inkscape -f flyer/svg/' + n + '.svg -A flyer/pdf/' + n + '.pdf'
	exec(cmd, function (error, stdout, stderr) {      
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			console.log('wrote ' + n + '.pdf')
		}
		callback()
	})
}
