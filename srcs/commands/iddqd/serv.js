const { access, createReadStream } = require('fs');
const { createServer } = require('http');
const { extname, join, resolve } = require('path');

class iddqd {
	constructor() {
		this.serve = undefined;
		this.config = {
			host: 'localhost',
			port: 1332,
		};
		this.servePath = resolve(__dirname);
		this.mimeType = {
			'.binary': 'binary/octet-stream',
			'.css': 'text/css',
			'.doc': 'application/msword',
			'.eot': 'application/vnd.ms-fontobject',
			'.html': 'text/html',
			'.ico': 'image/x-icon',
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
	}

	init() {
		this.serve = createServer((req, res) => {
			if (req.method === 'GET') {
				const file = { URL: String, PATH: String, EXT: String };
				file.URL = ((req.url === '/')
					? '/index.html'
					: req.url);
				file.PATH = resolve(join(this.servePath, file.URL));
				file.EXT = extname(file.PATH);

				if (!Object.prototype.hasOwnProperty.call(this.mimeType, file.EXT))
					file.EXT = '.binary';
				access(file.PATH, (err) => {
					if (err) {
						res.setHeader('Content-Type', 'text/html');
						res.writeHead(404);
						res.end('<h2>404</h2>');
						return;
					}
					res.setHeader('Content-Type', this.mimeType[file.EXT]);
					res.writeHead(200);
					createReadStream(file.PATH).pipe(res);
				});
			} else {
				res.setHeader('Content-Type', 'text/html');
				res.writeHead(404);
				res.end('<h2>404</h2>');
			}
		});
		this.serve.listen(this.config.port, this.config.host);
	}

	print() {
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

let childServe = new iddqd();
childServe.init();
childServe.print();
