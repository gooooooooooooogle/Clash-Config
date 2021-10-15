const axios = require('axios')
const fs = require('fs')

function main () {
	let url = 'http://feeds.feedburner.com/mattkaydiary/pZjG'
	axios.get(url).then(response => {
		const html = response.data 
		let path = html.match(/(?<=clash\(请开启代理后再拉取\)：)(.*?)(?=&lt;\/div&gt)/g)

		console.log('路径:' + path)
		console.log('path类型:' + typeof path)
		if (path.length > 0) {

			path = path[0].replace(/amp;/g, '')

			if (path && path.length > 0) {
				axios.get(path).then(response => {

					console.log('response类型:' + typeof response)
					console.log('response.data类型:' + typeof response.data)

					fs.writeFile('./Clash.yaml', response.data, err => {
						if (err) 
							console.log('error') 
						else 
							console.log('success')	
					})
				})
			}
		} else {
			fs.writeFile('./Clash.yaml', '', err => {
				if (err) 
					console.log('write null error') 
				else 
					console.log('write null success')	
			})
		}
		
	})
}

main()