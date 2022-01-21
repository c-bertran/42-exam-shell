const OS = require('os');
const process = require('process');
const { exec } = require('child_process');
const inquirer = require('inquirer');

class CheckLib
{
	static error(error = undefined, code = Number(127))
	{
		console.error(`${error} ${code}`);
		process.exit(code);
	}

	static child(command, ispipe = false)
	{
		return new Promise((resolve, reject) =>
		{
			const newChild = exec(command, {
				cwd: OS.tmpdir(),
				shell: '/bin/bash',
				windowsHide: true,
			}, (err) =>
			{
				if (err)
					reject(Number(127));
			}).on('close', (code) =>
			{
				if (code === 0)
					resolve(Number(0));
				reject(Number(code));
			});
			if (ispipe === true)
				newChild.stdout.pipe(process.stdout);
		});
	}

	static async install(resolve)
	{
		if (OS.platform() !== 'linux')
		{
			console.error('Under MacOS, automatic installation is unavailable. Please install `git`, `clang` and `valgrind` manually');
			process.exit(127);
		}
		await inquirer.prompt([
			{
				type: 'password',
				name: 'password',
				message: 'Password',
			},
		]).then((answer) =>
		{
			this.child(`echo "${answer.password}" | sudo -S apt install -y valgrind git clang`, true).then(() =>
			{
				console.log('Installation success, start program');
				resolve(true);
			});
		});
	}

	static check()
	{
		const platform = OS.platform();

		const DefLib = (lib) => `/sbin/ldconfig -p | grep -E "${lib}"`; // eslint-disable-line no-unused-vars

		if (platform !== 'linux' && platform !== 'darwin')
			this.error(`${platform}: unsupported plateform, please use linux or darwin`);
		return new Promise((resolve) =>
		{
			Promise.all([
				this.child('valgrind --version'),
				this.child('clang --version'),
				this.child('git --version'),
			]).then(() => resolve(true)).catch(() =>
			{
				console.error('Necessary librarie(s) not found, start installation');
				this.install(resolve);
			});
		});
	}
}

module.exports = CheckLib;
