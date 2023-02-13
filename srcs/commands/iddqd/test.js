const { access, createReadStream } = require('fs');
const { createServer } = require('http');
const { extname, join, resolve } = require('path');

const config = {
	host: 'localhost',
	port: 1332,
};
const servePath = resolve(__dirname);
const mimeType = {
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

const serve = createServer((req, res) => {
	if (req.method === 'GET') {
		const file = { URL: String, PATH: String, EXT: String };
		file.URL = ((req.url === '/')
			? '/index.html'
			: req.url);
		file.PATH = resolve(join(servePath, file.URL));
		file.EXT = extname(file.PATH);
		if (!Object.prototype.hasOwnProperty.call(mimeType, file.EXT))
			file.EXT = '.binary';
		access(file.PATH, (err) => {
			if (err) {
				res.setHeader('Content-Type', 'text/html');
				res.writeHead(404);
				res.end('<h2>404</h2>');
				return;
			}
			res.setHeader('Content-Type', mimeType[file.EXT]);
			res.writeHead(200);
			createReadStream(file.PATH).pipe(res);
		});
	} else {
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(404);
		res.end('<h2>404</h2>');
	}
});
serve.listen(config.port, config.host);

console.log(config.host, config.port);
