import { readFileSync } from 'fs';

export default class {
	private defineRegex: {
		leak: RegExp,
		fd: RegExp
	};
	private blob: string;
	private regex: {
		leaks: ({ [key: string]: string } | undefined)[],
		fds: ({ [key: string]: string } | undefined)[]
	};

	constructor(pathToLog: string) {
		this.defineRegex = {
			leak: /==\d+== (?<blob>(?<bytes>[\d,]+) bytes in (?<blocks>\d+) [^\d]+(?<record>\d+) of (?<records>\d+)\n(?<text>[\d\D]*?))==\d+== \n/gm,
			fd: /==\d+== Open file descriptor (?<blob>(?<fd>\d+): (?<file>.*(?<!valgrind_\d+.log|valgrind\d+.xml|\/dev\/.*|out_\d+))$)/gm
		};
		this.blob = readFileSync(pathToLog, { encoding: 'utf-8', flag: 'r' });
		this.regex = {
			leaks: Array.from(this.blob.matchAll(this.defineRegex.leak), (m) => m.groups),
			fds: Array.from(this.blob.matchAll(this.defineRegex.fd), (m) => m.groups)
		};
	}

	isLeaks(): boolean {
		return this.regex.leaks.length > 0;
	}

	isOpenFds(): boolean {
		return this.regex.fds.length > 0;
	}

	get leaks(): { bytes: number; blocks: number; text: string[] }[] | undefined {
		if (!this.regex.leaks.length)
			return undefined;
		const ret = [];
		for (const el of this.regex.leaks) {
			if (el) {
				const arr = Array.from(el.text.matchAll(/==\d+== +(.*)\n/gm), (m) => m[1]);
				ret.push({
					bytes: parseInt(el.bytes.replace(/,/g, ''), 10),
					blocks: parseInt(el.blocks.replace(/,/g, ''), 10),
					text: arr,
				});
			}
		}
		return ret;
	}

	get fds(): string[] | undefined {
		if (!this.regex.fds.length)
			return undefined;
		const ret = [];
		for (const el of this.regex.fds) {
			if (el)
				ret.push(el.file);
		}
		return ret;
	}
}