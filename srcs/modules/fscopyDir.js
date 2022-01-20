require('./fspatch');
const fs = require('fs');
const path = require('path');

fs.copyDirSync = function copyDirSync(src, dest, flags)
{
	const exists = fs.existsSync(src);
	const stats = exists && fs.statSync(src);
	const isDirectory = exists && stats.isDirectory();
	if (isDirectory)
	{
		fs.mkdirSync(dest);
		fs.readdirSync(src).forEach((childItemName) =>
		{
			copyDirSync(path.join(src, childItemName), path.join(dest, childItemName));
		});
	}
	else
	{
		fs.copyFileSync(src, dest, flags);
	}
};

module.exports = fs;
