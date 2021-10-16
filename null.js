const fs = require('fs')

function clearFile () {
	fs.writeFile('./Clash.yaml', '', err => {})
}

clearFile()