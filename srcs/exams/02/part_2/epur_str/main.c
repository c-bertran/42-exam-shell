#include <unistd.h>

void	ft_putchar(char c) {
	write(1, &c, 1);
}

int		ft_is_space(char c) {
	return ((c == ' ') || (c == '\t'));
}

void	ft_epur_str(char *str) {
	int	flag;

	flag = 0;
	while (ft_is_space(*str))
		str++;
	while (*str)
	{
		if (ft_is_space(*str))
			flag = 1;
		if (!ft_is_space(*str))
		{
			if (flag)
				ft_putchar(' ');
			flag = 0;
			ft_putchar(*str);
		}
		str++;
	}
}

int		main(int argc, char *argv[]) {
	if (argc == 2)
		ft_epur_str(argv[1]);
	ft_putchar('\n');
	return (0);
}