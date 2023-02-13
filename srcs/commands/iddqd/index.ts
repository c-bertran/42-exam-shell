import { access, createReadStream } from 'fs';
import { createServer, Server } from 'http';
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

	init() {
		this.serve = createServer((req, res) => {
			if (req.method === 'GET') {
				const file = { URL: String, PATH: String, EXT: String };
				file.URL = ((req.url === '/')
					? '/index.html'
					: req.url) as any;
				file.PATH = resolve(join(this.servePath, file.URL as any)) as any;
				file.EXT = extname(file.PATH as any) as any;

				if (!Object.prototype.hasOwnProperty.call(this.mimeType, file.EXT as any))
					file.EXT = '.binary' as any;
				access(file.PATH as any, (err) => {
					if (err) {
						res.setHeader('Content-Type', 'text/html');
						res.writeHead(404);
						res.end('<h2>404</h2>');
						return;
					}
					res.setHeader('Content-Type', this.mimeType[file.EXT as any]);
					res.writeHead(200);
					createReadStream(file.PATH as any).pipe(res);
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

let childServe: iddqd | undefined = undefined;
export default {
	name: 'iddqd',
	hide: true,
	description: {
		'en_US': 'A wonderful easter egg',
		'fr_FR': 'Un superbe easter egg'
	},
	exec: async () => {
		if (!childServe)
			childServe = new iddqd();
		childServe.print();
	}
} as command;