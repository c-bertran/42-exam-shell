#include <stdio.h>
#include <stdlib.h>
#include "ft_list.h"

void ft_list_remove_if(t_list **begin_list, void *data_ref, int (*cmp)());

void	push(t_list *start, int m) {
	int *n = malloc(sizeof(int));
	*n = m;
	t_list *temp = malloc(sizeof(t_list));
	temp->data = n;
	temp->next = 0;
	
	while (start->next)
		start = start->next;
	start->next = temp;
}

void	_free(t_list *start) {
	t_list *tmp;
	while (start != NULL) {
		tmp = start;
		start = start->next;
		free(tmp->data);
		free(tmp);
	}
}

int cmp(int *a, int *b) {
	return (*a - *b);
}

int	main(int argc, char **argv)
{
	(void)argc;
	int *n = malloc(sizeof(int));
	int data_ref = atoi(argv[2]);

	*n = 0;
	int len = atoi(argv[1]);
	t_list *start = malloc(sizeof(t_list));

	start->data = n;
	start->next = 0;
	for (int i = 1; i < len; i++) {
		push(start, i);
	}
	
	ft_list_remove_if(&start, &data_ref, &cmp);

	t_list *current = start;
	while (current) {
		printf("%d>", *(int*)current->data);
		current = current->next;
	}
	printf("\n");

	_free(start);
	
	return 0;
}
