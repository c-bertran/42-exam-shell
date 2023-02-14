import { get } from 'https';
import { stdout } from 'process';
import error from './error';

import format from './format';
import spinner from './spinner';

const isUpdate = (ver: string): boolean => {
	const reg = /^(?<major>\d).(?<minor>\d).(?<patch>\d)(-(?<type>\S+))?$/m;
	const tempPack = reg.exec(process.env.version as string);
	const tempCur = reg.exec(ver);

	if (tempCur && tempCur.groups && tempPack && tempPack.groups) {
		if (
			tempPack.groups.major < tempCur.groups.major
			|| tempPack.groups.minor < tempCur.groups.minor
			|| tempPack.groups.patch < tempCur.groups.patch
			|| tempPack.groups.type === 'alpha' && tempCur.groups.type === 'beta'
		)
			return true;
	}
	return false;
};

/**
 * Check if new version is available
 */
export default async (): Promise<void> => {
	const spin = new spinner();

	spin.start('Checks if an update is available', 'bounce');
	return new Promise((resolve) => {
		get(
			'https://api.github.com/repos/c-bertran/42-exam-shell/releases/latest',
			{
				headers: { 'User-Agent': 'Mozilla/5.0' },
			},
			(res) => {
				res.setEncoding('utf8');
				let data = '';
				res.on('data', (chunk: unknown) => data += chunk);
				res.on('end', () => {
					const blob = JSON.parse(data);
					spin.stop();
					stdout.clearLine(0);
					stdout.write(format.erase.erase);
					if (isUpdate(blob.tag_name)) {
						const str = `═════════════════ ${format.foreground.light.red}${blob.tag_name}${format.format.reset} ═════════════════`;
						const str2 = () => {
							let ret = '';
							const len = str.length - format.foreground.light.red.length - format.format.reset.length;
							for (let i = 0; i < len; i++)
								ret += '═';
							return ret;
						};
						console.log(str);
						console.log(`${format.foreground.normal.cyan}A new version is available for download${format.format.reset}`);
						console.log(blob.body);
						console.log(`${format.format.reset}» ${format.foreground.light.green}https://github.com/c-bertran/42-exam-shell/releases/latest${format.format.reset} «`);
						console.log(str2());
					}
					resolve();
				});
			}
		)
			.on('error', () => {
				spin.stop();
				stdout.clearLine(0);
				stdout.write(format.erase.erase);
				error(6);
				resolve();
			})
			.setTimeout(15000);
	});
};
