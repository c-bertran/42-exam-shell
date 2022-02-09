require('../fspatch');
const fs = require('fs');
const path = require('path');
const http = require('http');

const logo = (config) => `
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
                    is running on http://${config.host}:${config.port}
`;

const mimeType = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.wav': 'audio/wav',
	'.mp3': 'audio/mpeg',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.doc': 'application/msword',
	'.eot': 'application/vnd.ms-fontobject',
	'.ttf': 'application/font-sfnt',
	'.binary': 'binary/octet-stream',
};

class IDDQD
{
	constructor()
	{
		this.config = {
			host: 'localhost',
			port: '1332',
		};
		this.servePath = path.join(__dirname, '..', '..', 'iddqd');
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

				if (!Object.prototype.hasOwnProperty.call(mimeType, file.EXT))
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
					res.setHeader('Content-Type', mimeType[file.EXT]);
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
		console.log(logo(this.config));
	}
}

module.exports = IDDQD;
