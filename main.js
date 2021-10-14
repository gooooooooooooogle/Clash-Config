const axios = require('axios')
const fs = require('fs')

function main () {
	let url = 'http://feeds.feedburner.com/mattkaydiary/pZjG'
	axios.get(url).then(response => {
		const html = response.data 

		const start_key = 'clash(请开启代理后再拉取)：'
		const end_key = '</div>'
		const index = html.indexOf(start_key)
		const start_index = index + start_key.length
		const content = html.substring(start_index)
		const len = content.indexOf(end_key)
		let path = content.slice(0, len)

		console.log('path:' + path)

		if (path && path.length > 0) {
			axios.get(path).then(response => {
				fs.writeFile('./Clash.yaml', response, err => {
					if (err) 
						console.log('error', err.message) 
					else 
						console.log('success')	
				})
			})
		}
	})
}

main()