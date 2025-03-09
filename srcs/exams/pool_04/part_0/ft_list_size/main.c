#include <stdio.h>
#include <stdlib.h>

typedef struct s_list
{
    struct s_list *next;
    void          *data;
} t_list;

int	ft_list_size(t_list *begin_list);

void push(t_list *start) {
	int n = 42;
	t_list *temp = malloc(sizeof(t_list));
	temp->data = &n;
	temp->next = 0;
	
	while (start->next)
		start = start->next;
	start->next = temp;
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

	int n = 42;
	int len = atoi(argv[1]);
	t_list *start = malloc(sizeof(t_list));

	start->data = &n;
	start->next = 0;
	for (int i = 1; i < len; i++)
		push(start);

	printf("%d\n", ft_list_size(start));

	_free(start);
	
	return 0;
}