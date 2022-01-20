// https://github.com/serverless/serverless/blob/94ff3b22ab13afc60fb4e672520b4db527ee0432/lib/utils/standalone-patch.js
// Workaround 'pkg' bug: https://github.com/zeit/pkg/issues/420
// Copying files from snapshot via `fs.copyFileSync` crashes with ENOENT
// Overriding copyFileSync with primitive alternative

require('./fscopyDir');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

if (fs.copyFile)
{
	const originalCopyFile = fs.copyFile;
	const originalCopyFileSync = fs.copyFileSync;
	const isBundled = RegExp.prototype.test.bind(/^(?:\/snapshot\/|[A-Z]+:\\snapshot\\)/);

	fs.copyFile = function copyFile(src, dest, flags, callback)
	{
		if (!isBundled(path.resolve(src)))
		{
			originalCopyFile(src, dest, flags, callback);
			return;
		}
		if (typeof flags === 'function')
		{
			callback = flags; // eslint-disable-line no-param-reassign
			flags = 0; // eslint-disable-line no-param-reassign
		}
		else if (typeof callback !== 'function')
		{
			throw new TypeError('Callback must be a function');
		}

		fs.readFile(src, (readError, content) =>
		{
			if (readError)
			{
				callback(readError);
				return;
			}
			if (flags & fs.constants.COPYFILE_EXCL) // eslint-disable-line no-bitwise
				fs.stat(dest, (statError) =>
				{
					if (!statError)
					{
						callback(Object.assign(new Error('File already exists'), { code: 'EEXIST' }));
						return;
					}
					if (statError.code !== 'ENOENT')
					{
						callback(statError);
						return;
					}
					fs.writeFile(dest, content, callback);
				});
			else
				fs.writeFile(dest, content, callback);
		});
	};

	fs.copyFileSync = function copyFileSync(src, dest, flags)
	{
		if (!isBundled(path.resolve(src)))
		{
			originalCopyFileSync(src, dest, flags);
			return;
		}
		const content = fs.readFileSync(src);
		if (flags & fs.constants.COPYFILE_EXCL) // eslint-disable-line no-bitwise
		{
			try
			{
				fs.statSync(dest);
			}
			catch (statError)
			{
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
