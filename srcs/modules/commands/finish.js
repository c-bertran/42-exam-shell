require('../fspatch');
const fs = require('fs');
const process = require('process');

class finish
{
	static exec(JSON)
	{
		fs.rm(JSON.git.temp, { recursive: true, force: true }, (err) =>
		{
			// Callback present is here for rimraf error if no callback provided
			if (err)
				;
		});
		process.exit(0);
	}
}

module.exports = finish;
