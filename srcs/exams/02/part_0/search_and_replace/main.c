#include <unistd.h>

int	main(int ac, char **av)
{
	int	i = 0;

	if (ac == 4)
	{
		if(((av[2][0] >= 'a' && av[2][0]<= 'z') || (av[2][0] >= 'A' && av[2][0]<= 'Z')) && av[2][1] == '\0')
			if (((av[3][0] >= 'a' && av[2][0]<= 'z') || (av[3][0] >= 'A' && av[3][0]<= 'Z')) && av[3][1] == '\0')
			{
				while (av[1][i] != '\0')
				{
					if (av[1][i] == av[2][0])
						av[1][i] = av[3][0];
					write(1, &av[1][i], 1);
					i++;
				}
			}
	}
	write(1, "\n", 1);
	return 0;
}
