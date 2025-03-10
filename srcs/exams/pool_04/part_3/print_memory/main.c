#include <stddef.h>
#include <stdlib.h>
#include <unistd.h>

void	print_memory(const void *addr, size_t size);

int randNum(int born) {
	return rand() % born + 0;
}

int main(int argc, char **argv) {
	(void)argc;

	srand(atoi(argv[1]));
	int size = randNum(100);
	int tab[size];

	for (int i = 0; i < size; i++) {
		tab[i] = randNum(100000);
	}

	print_memory(tab, sizeof(tab));

	write(1, "\n", 1);
	
	return 0;
}
