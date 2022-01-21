require('../fspatch');
const fs = require('fs');
const path = require('path');
const process = require('process');
const http = require('http');

class IDDQD
{
	constructor()
	{
		this.config = {
			host: 'localhost',
			port: '8080',
		};
	}

	start()
	{
		this.instance = http.createServer((req, res) =>
		{
			fs.readFile(path.join(process.cwd(), 'srcs', 'IDDQD', 'index.html'), (err, data) =>
			{
				if (err)
				{
					res.writeHead(404);
					res.end(JSON.stringify(err));
					return;
				}
				res.writeHead(200);
				res.end(data);
			});
		});
		this.instance.listen(this.config.port, this.config.host, () =>
		{
			console.log(`Server is running on http://${this.config.host}:${this.config.port}`);
		});
	}
}

module.exports = IDDQD;
