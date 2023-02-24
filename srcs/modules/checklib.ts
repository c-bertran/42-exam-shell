import { exec } from 'child_process';
import { platform, tmpdir } from 'os';
import { exit, stdout } from 'process';
import prompts from 'prompts';
import error from './error';

const child = (command: string, ispipe = false): Promise<unknown> => {
	return new Promise((resolve, reject) => {
		const newChild = exec(command, {
			cwd: tmpdir(),
			shell: '/bin/bash',
			windowsHide: true,
			timeout: 15000
		}, (err) => {
			if (err)
				reject(Number(127));
		}).on('close', (code) => {
			if (code === 0)
				resolve(Number(0));
			reject(Number(code));
		});
		if (ispipe === true)
			newChild.stdout?.pipe(stdout);
	});
};

const install = async (resolve: (value: unknown) => void) => {
	await prompts({
		type: 'password',
		name: 'password',
		message: 'Password'
	}, {
		onCancel: () => error(3, { exit: true }),
	})
		.then((answer: { password: string }) => {
			child(`echo "${answer.password}" | sudo -k -S apt-get install -y bash clang git valgrind`, true)
				.then(() => {
					console.log('Installation success, start program');
					resolve(true);
				})
				.catch(() => {
					error(4);
					install(resolve);
				});
		})
		.catch((error) => {
			if (error.isTtyError)
				error(5, { exit: true });
			else
				console.error(error.message);
			exit(-1);
		});
};

/**
 * Check if mandatory lib is installed
 */
export default (): Promise<unknown> => {
	if (platform() !== 'linux' && platform() !== 'darwin')
		error(1);
	return new Promise((res) => {
		Promise.all([
			child('bash --version'),
			child('clang --version'),
			child('git --version'),
			child('valgrind --version'),
		])
			.then(() => res(true))
			.catch(() => {
				error(2);
				prompts({
					type: 'confirm',
					name: 'bypass',
					message: 'Do you want to skip installation step (e.g. a false negative) ?',
					initial: false
				},
				{ onCancel: () => true })
					.then((answer: { bypass: boolean }) => {
						if (Object.keys(answer).length <= 0 || answer.bypass)
							res(null);
						else
							install(res);
					})
					.catch((error) => {
						if (error.isTtyError)
							error(5, { exit: true });
						else
							console.error(error.message);
						exit(-1);
					});
			});
	});
};
