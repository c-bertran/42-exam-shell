#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[])
{
	if (argc == 3) {
		int x = atoi(argv[1]), y = atoi(argv[2]);
		if ((x > 0 && y > 0)) {
			while (x != y) {
				if (x > y)
					x -= y;
				else
					y -= x;
			}
		}
		printf("%d", x);
	}
	printf("\n");
	return 0;
}
