#include <stdlib.h>
#include <stdio.h>

typedef struct	s_point {
	int						x;
	int						y;
}								t_point;

void	flood_fill(char **tab, t_point size, t_point begin);

char** mallocArea(t_point size)
{
	char** new;

	new = malloc(sizeof(char*) * size.y);
	for (int i = 0; i < size.y; ++i)
	{
		new[i] = malloc(size.x + 1);
		for (int j = 0; j < size.x; ++j)
			new[i][j] = rand() % 2 ? '1' : '0';
		new[i][size.x] = '\0';
	}

	return new;
}

int randNum(int born) {
	return rand() % born + 0;
}

int	main(int argc, char **argv)
{
	(void)argc;
	int x = atoi(argv[1]);
	int y = atoi(argv[2]);

	srand(atoi(argv[3]));

	t_point size = {x, y};
	
	char **testZone = mallocArea(size);
	#pragma region testing zone

	t_point pointOne = {randNum(x), randNum(y)};
	t_point pointTwo = {randNum(x), randNum(y)};
	t_point pointThree = {randNum(x), randNum(y)};
	t_point pointFour = {randNum(x), randNum(y)};

	flood_fill(testZone, size, pointOne);
	flood_fill(testZone, size, pointTwo);
	flood_fill(testZone, size, pointThree);
	flood_fill(testZone, size, pointFour);

	for (int i = 0; i < size.y; ++i)
		printf("%s\n", testZone[i]);
	printf("\n");

	#pragma endregion testing zone
	for (int i = 0; i < size.y; ++i)
		free(testZone[i]);
	free(testZone);
	return 0;
}
