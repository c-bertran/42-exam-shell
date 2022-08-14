require('../fspatch');
const fs = require('fs');
const path = require('path');
const http = require('http');

class IDDQD
{
	constructor()
	{
		this.config = {
			host: 'localhost',
			port: '1332',
		};
		this.servePath = path.join(__dirname, '..', '..', 'iddqd');
		this.mimeType = {
			'.binary': 'binary/octet-stream',
			'.css': 'text/css',
			'.doc': 'application/msword',
			'.eot': 'application/vnd.ms-fontobject',
			'.html': 'text/html',
			'.ico':	'image/x-icon',
			'.jpg': 'image/jpeg',
			'.js': 'text/javascript',
			'.json': 'application/json',
			'.mp3': 'audio/mpeg',
			'.pdf': 'application/pdf',
			'.png': 'image/png',
			'.svg': 'image/svg+xml',
			'.ttf': 'application/font-sfnt',
			'.wav': 'audio/wav',
		};
		this.#initServer();
	}

	#initServer()
	{
		this.instance = http.createServer((req, res) =>
		{
			if (req.method === 'GET')
			{
				const file = { URL: String, PATH: String, EXT: String };
				file.URL = (req.url === '/') ? '/index.html' : req.url;
				file.PATH = path.resolve(path.join(this.servePath, file.URL));
				file.EXT = path.extname(file.PATH);

				if (!Object.prototype.hasOwnProperty.call(this.mimeType, file.EXT))
					file.EXT = '.binary';
				fs.access(file.PATH, (err) =>
				{
					if (err)
					{
						res.setHeader('Content-Type', 'text/html');
						res.writeHead(404);
						res.end('<h2>404</h2>');
						return;
					}
					res.setHeader('Content-Type', this.mimeType[file.EXT]);
					res.writeHead(200);
					fs.createReadStream(file.PATH).pipe(res);
				});
			}
			else
			{
				res.setHeader('Content-Type', 'text/html');
				res.writeHead(404);
				res.end('<h2>404</h2>');
			}
		});
		this.instance.listen(this.config.port, this.config.host);
	}

	print()
	{
		console.log(`
███████████████████    ██████████████   ██████████████   ██████    ██████████
   █████████████████ █████████████████ █████████████████ ███████   ███████   
   █████████████████ █████████████████ █████████████████ ███████  ████████   
   █████████████████ █████████████████ █████████████████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████    ██████ ██████     ██████ ██████     ██████ █████████████████   
   ███████   ███████ ███████    ██████ ██████    ███████ █████████████████   
   █████████████████ ██████████ ██████ ██████ ██████████ ██████ ██ ███████   
   █████████████████   ███████████████ ███████████████   ██████ ██ ███████   
   ███████████████       █████████████ █████████████       ████    ███████   
   █████████████            ████████     ████████            ██    ███████   
   ██████████                  ███         ███                     ███████   
   ███████                                                         ███████   
   █████                                                             █████   
   ██                                                                   ██
                    is running on http://${this.config.host}:${this.config.port}
		`);
	}
}

let childServe;
module.exports = {
	name: 'iddqd',
	description: 'Start doom',
	hide: true,
	exec: () =>
	{
		if (childServe === undefined)
			childServe = new IDDQD();
		childServe.print();
	},
};
