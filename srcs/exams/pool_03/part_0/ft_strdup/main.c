#include <stdlib.h>
#include <stdio.h>

char	*ft_strdup(char *src);

int		main(int argc, char **argv)
{
	char *str = (argc == 1) ? ft_strdup("") : ft_strdup(argv[1]);
	printf("%s\n", str);
	free(str);
	return(0);
}
