#include <stdlib.h>
#include <stdio.h>

char	**ft_split(char *str);

int main(int argc, char **argv)
{
	(void)argc;

	char	**split = ft_split(argv[1]);

	for (int i = 0; split[i]; i++)
	{
		printf("%s-", split[i]);
		free(split[i]);
	}
	free(split);
	printf("\n");
  return (0);
}
