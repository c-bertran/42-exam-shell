import { examDefinition } from '../interface';

export default {
	id: 'pool_02',
	dirName: 'pool_02',
	name: {
		'en_US': 'Pool 02',
		'fr_FR': 'Piscine 02'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'ft_strcpy',
				dir: 'part_0',
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
				dir: 'part_0',
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
			{
				id: 'repeat_alpha',
				dir: 'part_0',
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
		],
		[
			{
				id: 'search_and_replace',
				dir: 'part_1',
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
				dir: 'part_1',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
		[
			{
				id: 'ft_atoi',
				dir: 'part_4',
				name: {
					'en_US': 'ft_atoi',
					'fr_FR': 'ft_atoi'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_atoi.c', 'main.c']
				}
			},
			{
				id: 'ft_strdup',
				dir: 'part_4',
				name: {
					'en_US': 'ft_strdup',
					'fr_FR': 'ft_strdup'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_strdup.c', 'main.c']
				}
			},
			{
				id: 'inter',
				dir: 'part_4',
				name: {
					'en_US': 'inter',
					'fr_FR': 'inter'
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
		[
			{
				id: 'last_word',
				dir: 'part_5',
				name: {
					'en_US': 'last_word',
					'fr_FR': 'last_word'
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
				id: 'reverse_bits',
				dir: 'part_5',
				name: {
					'en_US': 'reverse_bits',
					'fr_FR': 'reverse_bits'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				copy: {
					check: ['reverse_bits.c', 'main.c']
				}
			},
			{
				id: 'swap_bits',
				dir: 'part_5',
				name: {
					'en_US': 'swap_bits',
					'fr_FR': 'swap_bits'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['swap_bits.c', 'main.c']
				}
			},
			{
				id: 'union',
				dir: 'part_5',
				name: {
					'en_US': 'union',
					'fr_FR': 'union'
				},
				trace: false,
				allowed_functions: ['write'],
				moulinette: true,
				leaks: true,
				copy: {
					check: ['main.c']
				}
			}
		],
		[
			{
				id: 'alpha_mirror',
				dir: 'part_6',
				name: {
					'en_US': 'alpha_mirror',
					'fr_FR': 'alpha_mirror'
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
				id: 'do_op',
				dir: 'part_6',
				name: {
					'en_US': 'do_op',
					'fr_FR': 'do_op'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['atoi', 'printf', 'write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_strcmp',
				dir: 'part_6',
				name: {
					'en_US': 'ft_strcmp',
					'fr_FR': 'ft_strcmp'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strcmp.c', 'main.c']
				}
			},
			{
				id: 'ft_strrev',
				dir: 'part_6',
				name: {
					'en_US': 'ft_strrev',
					'fr_FR': 'ft_strrev'
				},
				trace: false,
				moulinette: true,
				copy: {
					check: ['ft_strrev.c', 'main.c']
				}
			},
		],
		[
			{
				id: 'is_power_of_2',
				dir: 'part_7',
				name: {
					'en_US': 'is_power_of_2',
					'fr_FR': 'is_power_of_2'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['is_power_of_2.c', 'main.c']
				}
			},
			{
				id: 'max',
				dir: 'part_7',
				name: {
					'en_US': 'max',
					'fr_FR': 'max'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['main.c', 'max.c']
				}
			},
			{
				id: 'print_bits',
				dir: 'part_7',
				name: {
					'en_US': 'print_bits',
					'fr_FR': 'print_bits'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c', 'print_bits.c']
				}
			},
			{
				id: 'wdmatch',
				dir: 'part_7',
				name: {
					'en_US': 'wdmatch',
					'fr_FR': 'wdmatch'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['wdmatch.c']
				}
			},
		],
	],
} as examDefinition;
