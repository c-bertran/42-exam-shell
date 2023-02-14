import { examDefinition } from '../interface';

export default {
	id: 'exam_03',
	dirName: '03',
	name: {
		'en_US': 'Exam 03',
		'fr_FR': 'Examen 03'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'union',
				name: {
					'en_US': 'union',
					'fr_FR': 'union'
				},
				exponent: 2,
				trace: false,
				allowed_functions: ['write'],
				moulinette: true,
				leaks: true,
				copy: {
					check: ['union.c']
				}
			},
			{
				id: 'inter',
				name: {
					'en_US': 'inter',
					'fr_FR': 'inter'
				},
				exponent: 2,
				trace: false,
				allowed_functions: ['write'],
				moulinette: true,
				leaks: true,
				copy: {
					check: ['inter.c']
				}
			}
		],
		[
			{
				id: 'get_next_line',
				name: {
					'en_US': 'get_next_line',
					'fr_FR': 'get_next_line'
				},
				exponent: 2,
				trace: false,
				allowed_functions: ['read', 'free', 'malloc'],
				moulinette: true,
				leaks: true,
				copy: {
					user: ['test.sh'],
					check: ['get_next_line.c', 'get_next_line.h', 'main.c', 'files']
				}
			},
			{
				id: 'ft_printf',
				name: {
					'en_US': 'ft_printf',
					'fr_FR': 'ft_printf'
				},
				exponent: 2,
				trace: false,
				allowed_functions: ['malloc', 'free', 'write', 'va_start', 'va_arg', 'va_copy', 'va_end'],
				moulinette: true,
				leaks: true,
				copy: {
					check: ['main.c']
				}
			}
		]
	]
} as examDefinition;
