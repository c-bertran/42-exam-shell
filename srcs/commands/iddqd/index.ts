import { access, constants, createReadStream } from 'fs';
import { createServer, Server, ServerResponse } from 'http';
import { extname, join, resolve } from 'path';
import { command } from '../interface';

class iddqd {
	public serve: undefined | Server;
	private config: {
		host: string,
		port: number
	};
	private servePath: string;
	private mimeType: Record<string, string>;

	constructor() {
		this.serve = undefined;
		this.config = {
			host: 'localhost',
			port: 1332,
		};
		this.servePath = resolve(__dirname, 'data', 'iddqd');
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

	error(res: ServerResponse, code: number) {
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(code);
		res.end(`<h2>${code}</h2>`);
	}

	init() {
		this.serve = createServer((req, res) => {
			if (req.method === 'GET') {
				const file: {
					URL: string,
					PATH: string,
					EXT: string,
				} = { URL: '', PATH: '', EXT: '' };
				file.URL = ((req.url === '/')
					? '/index.html'
					: req.url?.toString() ?? '/index.html');
				if (![
					'/index.html',
					'/favicon.png',
					'/css/jsDos.css',
					'/css/style.css',
					'/js/jsDos.js',
				].includes(file.URL))
					return this.error(res, 403);
				file.PATH = resolve(join(this.servePath, file.URL));
				file.EXT = extname(file.PATH);
				if (!Object.prototype.hasOwnProperty.call(this.mimeType, file.EXT))
					file.EXT = '.binary';
				access(file.PATH, constants.F_OK, (err) => {
					if (err)
						return this.error(res, 404);
					res.setHeader('Content-Type', this.mimeType[file.EXT]);
					res.writeHead(200);
					createReadStream(file.PATH).pipe(res);
				});
			} else
				return this.error(res, 403);
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

let childServe: iddqd | undefined = undefined;
export default {
	name: 'iddqd',
	hide: true,
	description: {
		'en_US': 'A wonderful easter egg',
		'fr_FR': 'Un superbe easter egg'
	},
	exec: async () => {
		if (!childServe) {
			childServe = new iddqd();
			childServe.init();
		}
		childServe.print();
	}
} as command;
