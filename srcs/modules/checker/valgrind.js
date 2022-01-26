require('../fspatch');
const fs = require('fs');

const REGEX = {
	leak: /==\d+== (?<blob>(?<bytes>[\d,]+) bytes in (?<blocks>\d+) [^\d]+(?<record>\d+) of (?<records>\d+)\n(?<text>[\d\D]*?))==\d+== \n/gm,
	fd: /==\d+== Open file descriptor (?<blob>(?<fd>\d+): (?<file>.*(?<!valgrind_\d+.log|valgrind\d+.xml|\/dev\/.*|out_\d+))$)/gm,
};

class Valgrind
{
	constructor(fileLog)
	{
		this.blob = fs.readFileSync(fileLog, { encoding: 'utf-8', flag: 'r' });
		this.regex = {
			leaks: Array.from(this.blob.matchAll(REGEX.leak), (m) => m.groups),
			fds: Array.from(this.blob.matchAll(REGEX.fd), (m) => m.groups),
		};
	}

	is_leaks()
	{
		if (this.regex.leaks.length > 0)
			return true;
		return false;
	}

	is_open_fds()
	{
		if (this.regex.fds.length > 0)
			return true;
		return false;
	}

	get	leaks()
	{
		if (!this.regex.leaks.length)
			return undefined;
		const ret = [];
		for (const el of this.regex.leaks)
		{
			const arr = Array.from(el.text.matchAll(/==\d+== +(.*)\n/gm), (m) => m[1]);
			ret.push({
				bytes: parseInt(el.bytes.replace(/,/g, ''), 10),
				blocks: parseInt(el.blocks.replace(/,/g, ''), 10),
				text: arr,
			});
		}
		return ret;
	}

	get	fds()
	{
		if (!this.regex.fds.length)
			return undefined;
		const ret = [];
		for (const el of this.regex.fds)
			ret.push(el.file);
		return ret;
	}
}

module.exports = Valgrind;
