#include <stdio.h>
#include <stdlib.h>
#include "ft_list.h"

void	ft_list_foreach(t_list *begin_list, void (*f)(void *));

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

void f(void *data) {
	printf("%d>", *(int *)data);
}

int	main(int argc, char **argv)
{
	(void)argc;

	int *n = malloc(sizeof(int));
	*n = 0;
	int len = atoi(argv[1]);
	t_list *start = malloc(sizeof(t_list));
	start->data = n;
	start->next = 0;
	for (int i = 1; i < len; i++) {
		push(start, i);
	}

	ft_list_foreach(start, f);
	printf("\n");

	_free(start);
	
	return 0;
}
