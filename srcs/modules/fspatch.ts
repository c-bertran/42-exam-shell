/**
 * https://github.com/serverless/serverless/blob/94ff3b22ab13afc60fb4e672520b4db527ee0432/lib/utils/standalone-patch.js
 *
 * Workaround 'pkg' bug: https://github.com/zeit/pkg/issues/420
 * Copying files from snapshot via `fs.copyFileSync` crashes with ENOENT
 * Overriding copyFileSync with primitive alternative
 */

const fs = require('fs');
import { resolve } from 'path';
import { promisify } from 'util';

if (fs.copyFile) {
	const originalCopyFile = fs.copyFile;
	const originalCopyFileSync = fs.copyFileSync;
	const isBundled = RegExp.prototype.test.bind(/^(?:\/snapshot\/|[A-Z]+:\\snapshot\\)/);

	fs.copyFile = function copyFile(src: any, dest: any, flags: number, callback: (arg0: Error & { code: string; }) => void) {
		if (!isBundled(resolve(src))) {
			originalCopyFile(src, dest, flags, callback);
			return;
		}
		if (typeof flags === 'function') {
			callback = flags;
			flags = 0;
		} else if (typeof callback !== 'function') 
			throw new TypeError('Callback must be a function');
		

		fs.readFile(src, (readError: any, content: any) => {
			if (readError) {
				callback(readError);
				return;
			}
			if (flags & fs.constants.COPYFILE_EXCL) {
				fs.stat(dest, (statError: { code: string; }) => {
					if (!statError) {
						callback(Object.assign(new Error('File already exists'), { code: 'EEXIST' }));
						return;
					}
					if (statError.code !== 'ENOENT') {
						callback(Object.assign(new Error('File does not exists'), { code: 'ENOENT' }));
						return;
					}
					fs.writeFile(dest, content, callback);
				});
			} else
				fs.writeFile(dest, content, callback);
		});
	};

	fs.copyFileSync = function copyFileSync(src: any, dest: any, flags: number) {
		if (!isBundled(resolve(src))) {
			originalCopyFileSync(src, dest, flags);
			return;
		}
		const content = fs.readFileSync(src);
		if (flags & fs.constants.COPYFILE_EXCL) {
			try {
				fs.statSync(dest);
			} catch (statError: any) {
				if (statError.code !== 'ENOENT')
					throw statError;
				fs.writeFileSync(dest, content);
				return;
			}
			throw Object.assign(new Error('File already exists'), { code: 'EEXIST' });
		}
		fs.writeFileSync(dest, content);
	};

	if (fs.promises)
		fs.promises.copyFile = promisify(fs.copyFile);
}
