import { examDefinition } from '../interface';

export default {
	id: 'pool_04',
	dirName: 'pool_04',
	name: {
		'en_US': 'Pool 04',
		'fr_FR': 'Piscine 04'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'add_prime_sum',
				dir: 'part_0',
				name: {
					'en_US': 'add_prime_sum',
					'fr_FR': 'add_prime_sum'
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
				id: 'epur_str',
				dir: 'part_0',
				name: {
					'en_US': 'epur_str',
					'fr_FR': 'epur_str'
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
				id: 'ft_list_size',
				dir: 'part_0',
				name: {
					'en_US': 'ft_list_size',
					'fr_FR': 'ft_list_size'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_list_size.c', 'main.c']
				}
			},
			{
				id: 'ft_rrange',
				dir: 'part_0',
				name: {
					'en_US': 'ft_rrange',
					'fr_FR': 'ft_rrange'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_rrange.c', 'main.c']
				}
			},
			{
				id: 'hidenp',
				dir: 'part_0',
				name: {
					'en_US': 'hidenp',
					'fr_FR': 'hidenp'
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
				id: 'pgcd',
				dir: 'part_0',
				name: {
					'en_US': 'pgcd',
					'fr_FR': 'pgcd'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['printf', 'atoi', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'print_hex',
				dir: 'part_0',
				name: {
					'en_US': 'print_hex',
					'fr_FR': 'print_hex'
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
				id: 'rstr_capitalizer',
				dir: 'part_0',
				name: {
					'en_US': 'rstr_capitalizer',
					'fr_FR': 'rstr_capitalizer'
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
				id: 'expand_str',
				dir: 'part_1',
				name: {
					'en_US': 'expand_str',
					'fr_FR': 'expand_str'
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
				id: 'ft_atoi_base',
				dir: 'part_1',
				name: {
					'en_US': 'ft_atoi_base',
					'fr_FR': 'ft_atoi_base'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_atoi_base.c', 'main.c']
				}
			},
			{
				id: 'ft_range',
				dir: 'part_1',
				name: {
					'en_US': 'ft_range',
					'fr_FR': 'ft_range'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_range.c', 'main.c']
				}
			},
			{
				id: 'lcm',
				dir: 'part_1',
				name: {
					'en_US': 'lcm',
					'fr_FR': 'lcm'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['lcm.c', 'main.c']
				}
			},
			{
				id: 'paramsum',
				dir: 'part_1',
				name: {
					'en_US': 'paramsum',
					'fr_FR': 'paramsum'
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
				id: 'str_capitalizer',
				dir: 'part_1',
				name: {
					'en_US': 'str_capitalizer',
					'fr_FR': 'str_capitalizer'
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
				id: 'tab_mult',
				dir: 'part_1',
				name: {
					'en_US': 'tab_mult',
					'fr_FR': 'tab_mult'
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
				id: 'brainfuck',
				dir: 'part_2',
				name: {
					'en_US': 'brainfuck',
					'fr_FR': 'brainfuck'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'checkmate',
				dir: 'part_2',
				name: {
					'en_US': 'checkmate',
					'fr_FR': 'checkmate'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					user: ['examples.txt'],
					check: ['main.c']
				}
			},
			{
				id: 'flood_fill',
				dir: 'part_2',
				name: {
					'en_US': 'flood_fill',
					'fr_FR': 'flood_fill'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['flood_fill.c', 'main.c']
				}
			},
			{
				id: 'fprime',
				dir: 'part_2',
				name: {
					'en_US': 'fprime',
					'fr_FR': 'fprime'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['printf', 'atoi'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_itoa',
				dir: 'part_2',
				name: {
					'en_US': 'ft_itoa',
					'fr_FR': 'ft_itoa'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa.c', 'main.c']
				}
			},
			{
				id: 'ft_itoa_base',
				dir: 'part_2',
				name: {
					'en_US': 'ft_itoa_base',
					'fr_FR': 'ft_itoa_base'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa_base.c', 'main.c']
				}
			},
			{
				id: 'ft_split',
				dir: 'part_2',
				name: {
					'en_US': 'ft_split',
					'fr_FR': 'ft_split'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_split.c', 'main.c']
				}
			},
			{
				id: 'rev_wstr',
				dir: 'part_2',
				name: {
					'en_US': 'rev_wstr',
					'fr_FR': 'rev_wstr'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rostring',
				dir: 'part_2',
				name: {
					'en_US': 'rostring',
					'fr_FR': 'rostring'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'sort_list',
				dir: 'part_2',
				name: {
					'en_US': 'sort_list',
					'fr_FR': 'sort_list'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					user: ['list.h'],
					check: ['list.h', 'sort_list.c', 'main.c']
				}
			}
		],
		[],
	],
} as examDefinition;
