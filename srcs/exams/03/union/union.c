#include <unistd.h>

int main(int argc, char **argv)
{
	if (argc == 3)
	{
		char isExist[255];
		for (int x = 0; x < 255; x++)
			isExist[x] = 0;
		for (int x = 1; x < 3; x++)
		{
			for (int y = 0; argv[x][y] != '\0'; y++)
			{
				if (!isExist[(unsigned char)argv[x][y]])
				{
					isExist[(unsigned char)argv[x][y]] = 1;
					write(1, &argv[x][y], 1);
				}
			}
		}
	}
	write(1, "\n", 1);
	return 0;
}
