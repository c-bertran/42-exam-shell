#!/usr/bin/env node

const child = require('child_process');
const { randomBytes } = require('crypto');
const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const _package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), { encoding: 'utf-8' }));

const __data = {
	major: Number(0),
	minor: Number(0),
	patch: Number(0),
	version: String(''),
	force: Boolean(false),
	bypass: Boolean(false),
};
const commands = [
	{
		commands: ['-h', '--help'],
		nArgs: 0,
		func: () =>
		{
			console.log('Options:');
			console.log('--help    -h 	: Print help');
			console.log('--force   -f 	: Force using defined version and not calculated version');
			console.log('--bypass  -b 	: Bypass the end validation question');
			console.log('--major   -ma	: Set major number, beetween `0` to `99` included');
			console.log('--minor   -mi	: Set minor number, beetween `0` to `99` included');
			console.log('--patch   -p 	: Set patch number, beetween `0` to `99` included');
			console.log('--version -v 	: Set version, `alpha` or `beta`. If you want to delete version, set `delete`');
			process.exit(0);
		},
	},
	{
		commands: ['-b', '--bypass'],
		nArgs: 0,
		func: () =>
		{
			__data.bypass = Boolean(true);
		},
	},
	{
		commands: ['-f', '--force'],
		nArgs: 0,
		func: () =>
		{
			__data.force = Boolean(true);
		},
	},
	{
		commands: ['-ma', '--major'],
		nArgs: 1,
		func: (args) =>
		{
			const regex = /^([0-9]{1,2})$/;
			if (!regex.test(args[0]))
				throw new Error(`version \x1b[96m${args[0]}\x1b[0m is incorrect, please use (0-99)`);
			__data.major = Number(args[0]);
		},
	},
	{
		commands: ['-mi', '--minor'],
		nArgs: 1,
		func: (args) =>
		{
			const regex = /^([0-9]{1,2})$/;
			if (!regex.test(args[0]))
				throw new Error(`version \x1b[96m${args[0]}\x1b[0m is incorrect, please use (0-99)`);
			__data.minor = Number(args[0]);
		},
	},
	{
		commands: ['-p', '--patch'],
		nArgs: 1,
		func: (args) =>
		{
			const regex = /^([0-9]{1,2})$/;
			if (!regex.test(args[0]))
				throw new Error(`version \x1b[96m${args[0]}\x1b[0m is incorrect, please use (0-99)`);
			__data.patch = Number(args[0]);
		},
	},
	{
		commands: ['-v', '--version'],
		nArgs: 1,
		func: (args) =>
		{
			const regex = /^(alpha|beta|delete)$/;
			if (!regex.test(args[0]))
				throw new Error(`version \x1b[96m${args[0]}\x1b[0m is incorrect, please use 'alpha' or 'beta'. If you want to delete version, set 'delete'`);
			__data.version = String(args[0]);
		},
	},
];

const printError = (message = '') => console.error(`\x1b[31m\x1b[4mError\x1b[0m\x1b[31m:\x1b[0m ${message}`);

const calcVersion = (version) =>
{
	const calc = (current, add, isHundred = false) =>
	{
		let cur = Number(current) + Number(add);
		let rest = Number(0);
		while (cur > 99)
		{
			if (isHundred && cur === 100)
				return { cur: 99, rest };
			cur -= 100;
			++rest;
		}
		return { cur, rest };
	};

	const newVersion = {
		unit: Number(0),
		ten: Number(0),
		hundred: Number(0),
	};
	const oldVersion = /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})(?:-(alpha|beta))?$/.exec(version);
	const unit = calc(Number(oldVersion[3]), __data.patch);
	newVersion.unit = unit.cur;
	const ten = calc(Number(oldVersion[2]) + unit.rest, __data.minor);
	newVersion.ten = ten.cur;
	const hundred = calc(Number(oldVersion[1]) + ten.rest, __data.major, true);
	newVersion.hundred = hundred.cur;
	let ret = `${newVersion.hundred}.${newVersion.ten}.${newVersion.unit}`;
	if (__data.version.length > 0)
		ret += `-${__data.version}`;
	return (ret);
};

const endQuestion = (oldValue, newValue) =>
{
	const val = () =>
	{
		_package.version = newValue;
		try
		{
			fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(_package, null, 2), { encoding: 'utf-8', flag: 'w' });
		}
		catch (err)
		{
			throw new Error(err.message);
		}
		console.log('Version modification have been made');
	};

	if (__data.bypass)
	{
		val();
		process.exit(0);
	}

	readline.question(`The version will change from \x1b[96m${oldValue}\x1b[0m to \x1b[92m${newValue}\x1b[0m, is this correct ? (\x1b[92myes\x1b[0m | \x1b[91mno\x1b[0m) `, (e) =>
	{
		if (e !== 'yes' && e !== 'no')
		{
			printError('response is not yes or no, abort');
			process.exit(1);
		}
		if (e === 'no')
		{
			printError('abort modification');
			process.exit(1);
		}
		val();
		readline.question('Would you like to create a new release automatically and publish it immediately on GitHub ? (\x1b[92myes\x1b[0m | \x1b[91mno\x1b[0m) ', (e2) =>
		{
			if (e2 !== 'yes' && e2 !== 'no')
			{
				printError('response is not yes or no, abort');
				process.exit(1);
			}
			if (e2 === 'no')
			{
				printError('abort modification');
				process.exit(1);
			}
			const _child = child.spawn(`git add * && git commit -m "automatic commit [${newValue}] - ${randomBytes(12).toString('hex').slice(0, 12)}" && git tag ${newValue} && git push && git push --tags`, { shell: true });
			_child.stdout.on('data', (data) => console.log(data.toString()));
			_child.stderr.on('data', (data) => console.error(data.toString()));
			_child.on('close', () =>
			{
				console.log(`The release has been put online. Go to ${_package.repository.url} to check that the ci/cd is working well`);
				readline.close();
			});
		});
	});
};

const getCommand = (options) =>
{
	for (const el of commands)
		if (el.commands.indexOf(options) !== -1)
			return el;
	return undefined;
};

const main = () =>
{
	console.log('┌──────────────────────────────────────────┐');
	console.log('              \x1b[36mupdate-version\x1b[0m');
	console.log('     Easily update version of software');
	console.log('     copyright © Clément Bertrand,2022');
	console.log('└──────────────────────────────────────────┘');

	let newVersion;

	if (process.argv.length < 3)
	{
		printError('no argument is passed');
		process.exit(1);
	}

	for (let x = 2; process.argv[x]; x++)
	{
		const args = [];
		const command = getCommand(process.argv[x]);
		try
		{
			if (command === undefined)
				throw new Error(`option ${process.argv[x]} is undefined`);
			if (command.nArgs > 0)
			{
				const limit = x + command.nArgs;
				if (limit >= process.argv.length)
					throw new Error(`option ${process.argv[x]} need ${command.nArgs} argument${(command.nArgs > 1) ? 's' : ''}`);
				for (++x; x <= limit; x++)
					args.push(process.argv[x]);
				--x;
			}
			command.func(args);
		}
		catch (err)
		{
			printError(err.message);
			process.exit(1);
		}
	}
	
	if (!__data.force)
		newVersion = calcVersion(_package.version);
	else
	{
		newVersion = `${__data.major}.${__data.minor}.${__data.patch}${(__data.version.length > 0) ? `-${__data.version}` : ''}`;
	}
	console.log(newVersion);

	endQuestion(_package.version, newVersion);
}; main();
