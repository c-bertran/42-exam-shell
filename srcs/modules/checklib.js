const OS = require('os');
const process = require('process');
const { exec } = require('child_process');
const prompts = require('prompts');

class CheckLib
{
	static error(error = '', code = Number(127))
	{
		console.error(`[Error ${code}] ${error}`);
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
		await prompts({
			type: 'password',
			name: 'password',
			message: 'Password',
		}, {
			onCancel: () => this.error('The prompt was cancelled. Please install `git`, `clang` and `valgrind` manually, or restart this application for retry', 122),
		}).then((answer) =>
		{
			this.child(`echo "${answer.password}" | sudo -S apt install -y valgrind git clang`, true).then(() =>
			{
				console.log('Installation success, start program');
				resolve(true);
			}).catch(() =>
			{
				console.error('User password is incorrect');
				this.install(resolve);
			});
		}).catch((error) =>
		{
			if (error.isTtyError)
				console.error('Prompt couldn\'t be rendered in the current environment');
			else
				console.error(error.message);
			process.exit(-1);
		});
	}

	static check()
	{
		const platform = OS.platform();

		if (platform !== 'linux' && platform !== 'darwin')
			this.error(`${platform}: unsupported plateform, please use linux or darwin`, 120);
		if (platform !== 'linux')
			this.error('Under MacOS, automatic installation is unavailable. Please install `git`, `clang` and `valgrind` manually', 121);
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
