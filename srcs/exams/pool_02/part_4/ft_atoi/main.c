#include <stdio.h>

int	ft_atoi(const char *str);

int main(int argc, char **argv)
{
	(void)argc;

	printf("%d\n", ft_atoi(argv[1]));
	return 0;
}
