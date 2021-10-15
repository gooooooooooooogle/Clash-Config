const axios = require('axios')
const fs = require('fs')

async function main () {
	const path = await getPath()
	console.log('Config路径：' + path)
	if (path === '') return
	getClashConfig(path)
}

async function getPath () {
	const url = "http://feeds.feedburner.com/mattkaydiary/pZjG"
	let response = await axios.get(url)

	const html = response.data || ""
	let pathArr = html.match(/(?<=clash\(请开启代理后再拉取\)：)(.*?)(?=&lt;\/div&gt)/g) || []
	console.log('pathArr：' + pathArr)
	let path = ""
	if (pathArr.length > 0) {
		path = pathArr[0].replace(/amp;/g, '')
	}
	return path
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