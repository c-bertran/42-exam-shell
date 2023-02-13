#include <stdio.h>
#include <stdlib.h>
#include "list.h"

t_list	*sort_list(t_list *lst, int (*cmp)(int, int));

int ascending(int a, int b)
{
	return (a <= b);
}

int descending(int a, int b)
{
	return (a >= b);
}

int randNum()
{
	if (rand() % 2)
		return rand() % 500;
	return (rand() % 500) - 1;
}

void push(t_list *list, t_list *list2)
{
	int x = randNum();
	while (list->next)
	{
		list = list->next;
		list2 = list2->next;
	}
	t_list *temp = malloc(sizeof(t_list));
	temp->data = x;
	temp->next = 0;
	t_list *temp2 = malloc(sizeof(t_list));
	temp2->data = x;
	temp2->next = 0;

	list->next = temp;
	list2->next = temp2;
}

void _print(t_list *list)
{
	while (list->next)
	{
		printf("%d|", list->data);
		list = list->next;
	}
	printf("%d\n", list->data);
}

int size(t_list *list)
{
	int size = 0;
	while (list->next)
	{
		++size;
		list = list->next;
	}
	return ++size;
}

void _free(t_list *start) {
	t_list *tmp;
	while (start != NULL) {
		tmp = start;
		start = start->next;
		free(tmp);
	}
}

int	main(int argc, char **argv)
{
	(void)argc;

	int len = atoi(argv[1]);
	t_list *list = malloc(sizeof(t_list));
	t_list *list2 = malloc(sizeof(t_list));

	srand(atoi(argv[2]));
	int x = randNum();
	list->data = x;
	list->next = 0;
	list2->data = x;
	list2->next = 0;
	for (int i = 1; i < len; i++)
		push(list, list2);

	t_list *asc = sort_list(list, ascending);
	t_list *desc = sort_list(list2, descending);

	_print(asc);
	_print(desc);

	_free(list);
	_free(list2);

	return 0;
}
