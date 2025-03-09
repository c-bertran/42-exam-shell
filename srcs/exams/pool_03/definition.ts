import { examDefinition } from '../interface';

export default {
	id: 'pool_03',
	dirName: 'pool_03',
	name: {
		'en_US': 'Pool 03',
		'fr_FR': 'Piscine 03'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'ft_atoi',
				dir: 'part_0',
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
				dir: 'part_0',
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
				dir: 'part_0',
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
			{
				id: 'last_word',
				dir: 'part_0',
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
				dir: 'part_0',
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
				dir: 'part_0',
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
				dir: 'part_0',
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
				dir: 'part_1',
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
				dir: 'part_1',
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
				dir: 'part_1',
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
				dir: 'part_1',
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
			{
				id: 'is_power_of_2',
				dir: 'part_1',
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
				dir: 'part_1',
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
				dir: 'part_1',
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
				dir: 'part_1',
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
		[
			{
				id: 'add_prime_sum',
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_2',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
				dir: 'part_3',
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
			}
		],
	]
} as examDefinition;
