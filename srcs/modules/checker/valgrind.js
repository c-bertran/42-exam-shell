require('../fspatch');
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

class Valgrind
{
	constructor(filePath)
	{
		this.blob = fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' });
		this.parser = new XMLParser();
		this.doc = this.parser.parse(this.blob).valgrindoutput;
		// eslint-disable-next-line no-prototype-builtins
		if (Object.prototype.hasOwnProperty.call(this.doc, 'error'))
			if (this.doc.error.length <= 1)
				this.errors = String(`${this.doc.error.length} leak has been detected`);
			else
				this.errors = String(`${this.doc.error.length} leaks have been detected`);
		else
			this.errors = String('no leak');
	}

	check()
	{
		if (this.errors !== 'no leak')
			return true;
		return false;
	}

	get leaks()
	{
		return this.errors;
	}
}

module.exports = Valgrind;
