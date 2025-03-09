#include <stdio.h>
#include <stdlib.h>

char	*ft_itoa(int nbr);

int	main(int argc, char **argv)
{
	(void)argc;

	char *s = ft_itoa(atoi(argv[1]));
	printf("%s\n", s);
	free(s);
	return (0);
}
