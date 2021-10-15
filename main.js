const axios = require('axios')
const fs = require('fs')

function main () {
	let path = getPath()
	console.log('Config路径：' + path)
	if (path === '') return
	getClashConfig(path)
}

function getPath () {
	const url = "http://feeds.feedburner.com/mattkaydiary/pZjG"
	axios.get(url).then(response => {
		const html = response.data || ""
		let pathArr = html.match(/(?<=clash\(请开启代理后再拉取\)：)(.*?)(?=&lt;\/div&gt)/g) || []
		let path = ""
		if (pathArr.length > 0) {
			path = pathArr[0].replace(/amp;/g, '')
		}
		return path
	})
}


function getClashConfig (path) {
	axios.get(path).then(response => {
		let data = response.data || ''
		if (data !== '') writeFile(data) 
	})
}

function writeFile (data) {
	fs.writeFile('./Clash.yaml', data, err => {
		if (err) 
			console.log('error') 
		else 
			console.log('success')	
	})
}

main()