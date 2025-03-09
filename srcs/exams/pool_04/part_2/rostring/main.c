#include <unistd.h>

void	rostring(char *str)
{
	int		i = 0, k = 0;

	if (*str) {
		i = 0;
		while (str[i] == ' ' || str[i] == '\t')
			i++;
		k = i;
		while (str[i] && str[i] != ' ' && str[i] != '\t')
			i++;
		while (str[i]) {
			if (str[i] && (str[i] != ' ' && str[i] != '\t') && (str[i - 1] == ' ' || str[i - 1] == '\t')) {
				while (str[i] && (str[i] != ' ' && str[i] != '\t'))
					write(1, &str[i++], 1);
				write(1, " ", 1);
			}
			i++;
		}
		while (str[k] && (str[k] != ' ' && str[k] != '\t'))
			write(1, &str[k++], 1);
	}
}

int		main(int argc, char *argv[])
{
	if (argc > 1)
		rostring(argv[1]);
	write(1, "\n", 1);
	return (0);
}