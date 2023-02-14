import { examDefinition } from '../interface';

export default {
	id: 'exam_05',
	dirName: '05',
	name: {
		'en_US': 'Exam 05',
		'fr_FR': 'Examen 05'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'module_00',
				name: {
					'en_US': 'module_00',
					'fr_FR': 'module_00'
				},
				exponent: 3,
				trace: false,
				moulinette: [false, true],
				leaks: true,
				forbidden_keywords: ['switch'],
				copy: {
					check: ['testing', '*.cpp', '*.hpp']
				}
			}
		],
		[
			{
				id: 'module_01',
				name: {
					'en_US': 'module_01',
					'fr_FR': 'module_01'
				},
				exponent: 3,
				trace: false,
				moulinette: [false, true],
				leaks: true,
				forbidden_keywords: ['switch'],
				copy: {
					check: ['testing', '*.cpp', '*.hpp']
				}
			}
		],
		[
			{
				id: 'module_02',
				name: {
					'en_US': 'module_02',
					'fr_FR': 'module_02'
				},
				exponent: 3,
				trace: false,
				moulinette: [false, true],
				leaks: true,
				forbidden_keywords: ['switch'],
				copy: {
					check: ['*.cpp', '*.hpp', 'main.c']
				}
			}
		]
	]
} as examDefinition;
