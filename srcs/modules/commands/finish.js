require('../fspatch');
const fs = require('fs');
const process = require('process');

class finish
{
	static exec(JSON)
	{
		fs.rm(JSON.git.temp, { recursive: true, force: true });
		process.exit(0);
	}
}

module.exports = finish;
