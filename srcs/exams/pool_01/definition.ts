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
				leaks: true,
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
				leaks: true,
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
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['ft_print_numbers.c', 'main.c'],
				}
			}
		],
		[],
		[],
		[],
		[],
		[],
		[],
	],
} as examDefinition;
