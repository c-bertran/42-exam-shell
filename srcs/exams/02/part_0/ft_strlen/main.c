#include <stdio.h>

int	ft_strlen(char *str);

int main(int argc, char **argv)
{
	(void)argc;
	printf("%n", ft_strlen(argv[1]));
	return 0;
}
