#include <stdio.h>

char	*ft_strrev(char *str);

int		main(int argc, char **argv)
{
	printf("%s#%s\n", argv[1], ft_strrev(argv[1]));
	return (0);
}
