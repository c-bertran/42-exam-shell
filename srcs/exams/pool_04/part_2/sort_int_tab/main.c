#include <stdio.h>
#include <stdlib.h>

void sort_int_tab(int *tab, unsigned int size);

int main(int argc, char *argv[])
{
	unsigned int size = argc - 1;
	int *tab = malloc(size * sizeof(int));
	if (tab == NULL) {
		perror("malloc");
		return 1;
	}

	for (unsigned int i = 0; i < size; i++) {
		tab[i] = atoi(argv[i + 1]);
	}

	printf("Original: ");
	for (unsigned int i = 0; i < size; i++) {
		printf("%d ", tab[i]);
	}
	printf("\n");

	sort_int_tab(tab, size);

	printf("Sorted: ");
	for (unsigned int i = 0; i < size; i++) {
		printf("%d ", tab[i]);
	}
	printf("\n");

	free(tab);
	return 0;
}
