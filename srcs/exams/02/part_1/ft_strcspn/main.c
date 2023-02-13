#include <stdio.h>

size_t	ft_strcspn(const char *s, const char *reject);

int main(int argc, char **argv)
{
	if (argc == 3)
		printf("%zu\n", ft_strcspn(argv[1], argv[2]));
	return 0;
}