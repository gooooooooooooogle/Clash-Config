const axios = require('axios')
const fs = require('fs')

function main () {
	let url = 'http://feeds.feedburner.com/mattkaydiary/pZjG'
	axios.get(url).then(response => {
		const html = response.data 

		/*
		const start_key = 'clash(请开启代理后再拉取)：'
		const end_key = '</div>'
		const index = html.indexOf(start_key)
		const start_index = index + start_key.length
		const content = html.substring(start_index)
		const len = content.indexOf(end_key)

		*/

		path = html.match(/clash\(请开启代理后再拉取\)：(.+?)<\/div>/g)[1]; 


		// let path = content.slice(0, len)

		path = path.replace(/amp;/g, '')
		console.log('Config配置文件路径:' + path)

		console.log('Config配置文件类型:' + typeof path)

		if (path && path.length > 0) {
			axios.get(path).then(response => {

				console.log('response类型:' + typeof response)

				fs.writeFile('./Clash.yaml', response, err => {
					if (err) 
						console.log('error') 
					else 
						console.log('success')	
				})
			})
		}
	})
}

main()