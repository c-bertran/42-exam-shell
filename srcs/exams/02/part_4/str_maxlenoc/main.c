#include <unistd.h>

int		ft_strlen(char *s) {
	int i = 0;

	while (*(s + i))
		i++;
	return (i);
}

int		find_indx_min_str(int argc, char *argv[]) {
	int minLen = (~0u >> 1), minIdx = 1, lenght = 0, i = 1;
	
	while (i < argc) {
		lenght = ft_strlen(argv[i]);
		if (minLen > lenght)
		{
			minLen = lenght;
			minIdx = i;
		}
		i++;
	}
	return (minIdx);
}

int		find_fragment(char *fragment, char *str, int len) {
	int	i = -1;

	while (++i < len) {
		if (fragment[i] != str[i])
		{
			if (!str[1])
				return (0);
			str++;
			i = -1;
		}
	}
	return (1);
}

int		largest_match_size(char *fragment, int argc, char *argv[]) {
	int	len = ft_strlen(fragment), i = -1;

	while (++i < argc)
	{
		if (!find_fragment(fragment, argv[i], len))
		{
			if (len <= 1)
				return (-1);
			len--;
			i = -1;
		}
	}
	return (len);
}

void	ft_swap(char **a, char **b) {
	char *temp;

	temp = *a;
	*a = *b;
	*b = temp;
}

int		ft_str_maxlenoc(int argc, char *argv[]) {
	char	*fragment;
	int		index, max_len, max_index, tmp;

	if (argc == 1)
		write(1, argv[0], ft_strlen(argv[0]));
	else
	{
		tmp = find_indx_min_str(argc, argv);
		if (tmp != 1)
			ft_swap(&argv[0], &argv[tmp]);
		fragment = argv[0];
		index = 0;
		max_index = 0;
		max_len = -1;
		argc--;
		argv++;
		while (*(fragment + index)) {
			tmp = largest_match_size(fragment + index, argc, argv);
			if (max_len < tmp) {
				max_len = tmp;
				max_index = index;
			}
			index++;
		}
		if (max_index > -1)
			write(1, fragment + max_index, max_len);
	}
	write(1, "\n", 1);
	return (0);
}

int		main(int argc, char *argv[]) {
	if (argc >= 2)
		ft_str_maxlenoc(argc - 1, argv + 1);
	else
		write(1, "\n", 1);
	return (0);
}
