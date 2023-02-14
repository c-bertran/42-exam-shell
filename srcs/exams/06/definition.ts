import { examDefinition } from '../interface';

export default {
	id: 'exam_06',
	dirName: '06',
	name: {
		'en_US': 'Exam 06',
		'fr_FR': 'Examen 06'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'mini_serv',
				name: {
					'en_US': 'mini_serv',
					'fr_FR': 'mini_serv'
				},
				exponent: 1,
				trace: true,
				moulinette: true,
				leaks: true,
				forbidden_keywords: ['define'],
				allowed_functions: ['write', 'close', 'select', 'socket', 'accept', 'listen', 'send', 'recv', 'bind', 'strstr', 'malloc', 'realloc', 'free', 'calloc', 'bzero', 'atoi', 'sprintf', 'strlen', 'exit', 'strcpy', 'strcat', 'memset'],
				copy: {
					user: ['main.c', 'nc'],
					check: ['tests']
				}
			}
		]
	]
} as examDefinition;
