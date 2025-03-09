#include <unistd.h>

int	main(int argc, char **argv)
{
	int i = 0, k = 1;
	char *str;

	if (argc == 2)
	{
		str = argv[1];
		while (str[i] != '\0')
		{
			k = 1;
			if (str[i] >= 'A' && str[i] <= 'Z')
				k = str[i] - 64;
			if (str[i] >= 'a' && str[i] <= 'z')
				k = str[i] - 96;
			while (k >= 1)
			{
				write(1, &str[i], 1);
				k--;
			}
			i++;
		}
	}
	write(1, "\n", 1);
	return 0;
}
