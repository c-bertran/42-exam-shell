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
		[
			{
				id: 'maff_revalpha',
				dir: 'part_3',
				name: {
					'en_US': 'maff_revalpha',
					'fr_FR': 'maff_revalpha'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['maff_revalpha.c'],
				}
			},
			{
				id: 'only_a',
				dir: 'part_3',
				name: {
					'en_US': 'only_a',
					'fr_FR': 'only_a'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['only_a.c'],
				}
			},
			{
				id: 'only_z',
				dir: 'part_3',
				name: {
					'en_US': 'only_z',
					'fr_FR': 'only_z'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['only_z.c'],
				}
			},
		],
		[
			{
				id: 'ft_strcpy',
				dir: 'part_4',
				name: {
					'en_US': 'ft_strcpy',
					'fr_FR': 'ft_strcpy'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strcpy.c', 'main.c']
				}
			},
			{
				id: 'ft_strlen',
				dir: 'part_4',
				name: {
					'en_US': 'ft_strlen',
					'fr_FR': 'ft_strlen'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strlen.c', 'main.c']
				}
			},
		],
		[
			{
				id: 'repeat_alpha',
				dir: 'part_5',
				name: {
					'en_US': 'repeat_alpha',
					'fr_FR': 'repeat_alpha'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'search_and_replace',
				dir: 'part_5',
				name: {
					'en_US': 'search_and_replace',
					'fr_FR': 'search_and_replace'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'exit'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ulstr',
				dir: 'part_5',
				name: {
					'en_US': 'ulstr',
					'fr_FR': 'ulstr'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			}
		],
		[
			{
				id: 'first_word',
				dir: 'part_6',
				name: {
					'en_US': 'first_word',
					'fr_FR': 'first_word'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['first_word.c']
				}
			},
			{
				id: 'ft_putstr',
				dir: 'part_6',
				name: {
					'en_US': 'ft_putstr',
					'fr_FR': 'ft_putstr'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['ft_putstr.c', 'main.c']
				}
			},
			{
				id: 'ft_swap',
				dir: 'part_6',
				name: {
					'en_US': 'ft_swap',
					'fr_FR': 'ft_swap'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_swap.c', 'main.c']
				}
			},
		],
		[
			{
				id: 'rev_print',
				dir: 'part_7',
				name: {
					'en_US': 'rev_print',
					'fr_FR': 'rev_print'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rot_13',
				dir: 'part_7',
				name: {
					'en_US': 'rot_13',
					'fr_FR': 'rot_13'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rotone',
				dir: 'part_7',
				name: {
					'en_US': 'rotone',
					'fr_FR': 'rotone'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
		],
	],
} as examDefinition;
