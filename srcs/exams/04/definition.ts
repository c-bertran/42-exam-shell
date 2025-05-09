import { examDefinition } from '../interface';

export default {
	id: 'exam_04',
	dirName: '04',
	name: {
		'en_US': 'Exam 04',
		'fr_FR': 'Examen 04'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'microshell',
				name: {
					'en_US': 'microshell',
					'fr_FR': 'microshell'
				},
				exponent: 1,
				trace: true,
				moulinette: true,
				leaks: true,
				allowed_functions: ['chdir', 'close', 'dup', 'dup2', 'execve', 'exit', 'fork', 'free', 'kill', 'malloc', 'pipe', 'signal', 'strcmp', 'strncmp', 'waitpid', 'write'],
				copy: {
					check: ['microshell.c', 'random.txt']
				}
			}
		]
	]
} as examDefinition;
