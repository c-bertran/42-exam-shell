import { examDefinition } from '../interface';

export default {
	id: 'pool_01',
	dirName: 'pool_01',
	name: {
		'en_US': 'Pool 01',
		'fr_FR': 'Piscine 01'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'aff_a',
				dir: 'part_0',
				name: {
					'en_US': 'aff_a',
					'fr_FR': 'aff_a'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['aff_a.c']
				}
			},
			{
				id: 'ft_countdown',
				dir: 'part_0',
				name: {
					'en_US': 'ft_countdown',
					'fr_FR': 'ft_countdown'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['ft_countdown.c']
				}
			},
			{
				id: 'ft_print_numbers',
				dir: 'part_0',
				name: {
					'en_US': 'ft_print_numbers',
					'fr_FR': 'ft_print_numbers'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['ft_print_numbers.c', 'main.c'],
				}
			}
		],
		[
			{
				id: 'hello',
				dir: 'part_1',
				name: {
					'en_US': 'hello',
					'fr_FR': 'hello'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['hello.c'],
				}
			},
			{
				id: 'maff_alpha',
				dir: 'part_1',
				name: {
					'en_US': 'maff_alpha',
					'fr_FR': 'maff_alpha'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['maff_alpha.c'],
				}
			}
		],
		[
			{
				id: 'aff_first_param',
				dir: 'part_2',
				name: {
					'en_US': 'aff_first_param',
					'fr_FR': 'aff_first_param'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['aff_first_param.c'],
				}
			},
			{
				id: 'aff_last_param',
				dir: 'part_2',
				name: {
					'en_US': 'aff_last_param',
					'fr_FR': 'aff_last_param'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['aff_last_param.c'],
				}
			},
			{
				id: 'aff_z',
				dir: 'part_2',
				name: {
					'en_US': 'aff_z',
					'fr_FR': 'aff_z'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['aff_z.c'],
				}
			},
		],
		[],
		[],
		[],
		[],
	],
} as examDefinition;
