#include <unistd.h>

int main(int argc, char **argv)
{
	if (argc == 3)
	{
		char isExist[255];
		for (int x = 0; x < 255; x++)
			isExist[x] = 0;
		for (int x = 0; argv[1][x]; x++)
		{
			for (int y = 0; argv[2][y] != '\0'; y++)
			{
				if (argv[1][x] == argv[2][y] && !isExist[(unsigned char)argv[1][x]])
				{
					write(1, &argv[1][x], 1);
					isExist[(unsigned char)argv[1][x]] = 1;
				}
			}
		}
	}
	write(1, "\n", 1);
	return 0;
}
