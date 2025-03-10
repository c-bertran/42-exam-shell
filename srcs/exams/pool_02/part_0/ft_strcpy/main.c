#include <stdlib.h>
#include <stdio.h>

char	*ft_strcpy(char *s1, char *s2);

int main(int argc, char **argv)
{
	(void)argc;
	char *str = malloc(sizeof(char) * 100);

	printf("%s\n", ft_strcpy(str, argv[1]));
	free(str);
	return 0;
}
