#include <unistd.h>
#include <stdlib.h>

static int ft_strlen(char *str)
{
	int x = 0;
	while (str[x] != 0)
		++x;
	return x;
}

static void sort_string(char *str)
{
	int len = ft_strlen(str);
	for (int i = 0; i < len; i++)
	{
		for (int j = 0; j < len; j++)
		{
			if (str[i] > str[j])
			{
				char temp = str[i];
				str[i] = str[j];
				str[j] = temp;
			}
		}
	}
}

int main(int argc, char **argv)
{
	if (argc == 3)
	{
		char *dest;
		int first = ft_strlen(argv[1]);
		int second = ft_strlen(argv[2]);
		if (first < second)
			first = second;
		dest = malloc(sizeof(char) * (first + 1));
		if (!dest)
			return 1;
		for (int x = 0; x <= first; x++)
			dest[x] = 0;
		
		int i = 0;
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
					dest[i++] = argv[x][y];
				}
			}
		}
		sort_string(dest);
		write(1, dest, ft_strlen(dest));
		free(dest);
	}
	write(1, "\n", 1);
	return 0;
}
