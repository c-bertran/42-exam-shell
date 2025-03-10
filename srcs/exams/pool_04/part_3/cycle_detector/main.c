#include <stdio.h>
#include <stdlib.h>
#include "ft_list.h"

int cycle_detector(const t_list *list);

t_list *push(t_list *start, int m) {
	int *n = malloc(sizeof(int));
	*n = m;
	t_list *temp = malloc(sizeof(t_list));
	temp->data = n;
	temp->next = 0;
	
	while (start->next)
		start = start->next;
	start->next = temp;
	return temp;
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

void create_cycle(t_list *start, int cycle_start_index) {
	t_list *cycle_start = start;
	t_list *current = start;

	while (cycle_start_index-- > 0 && cycle_start) {
		cycle_start = cycle_start->next;
	}

	if (cycle_start == NULL) {
		return; // Index out of bounds, do not create a cycle
	}

	while (current->next) {
		current = current->next;
	}

	current->next = cycle_start;
}

int	main(int argc, char **argv)
{
	if (argc < 2) {
		printf("Usage: %s <list of integers>\n", argv[0]);
		return 1;
	}

	t_list *start = malloc(sizeof(t_list));
	start->data = malloc(sizeof(int));
	*(int *)start->data = atoi(argv[1]);
	start->next = NULL;

	t_list *current = start;
	for (int i = 2; i < argc; i++) {
		current = push(current, atoi(argv[i]));
	}

	// Check for cycle creation based on input
	for (int i = 1; i < argc; i++) {
		for (int j = i + 1; j < argc; j++) {
			if (atoi(argv[i]) == atoi(argv[j])) {
				create_cycle(start, i - 1);
				break;
			}
		}
	}

	int check = cycle_detector(start);

	printf("%d\n", check);

	if (check == 1) {
		// Break the cycle before freeing the list
		t_list *slow = start;
		t_list *fast = start;
		while (fast && fast->next) {
			slow = slow->next;
			fast = fast->next->next;
			if (slow == fast) {
				// Cycle detected, break it
				t_list *ptr1 = start;
				t_list *ptr2 = slow;
				while (ptr1->next != ptr2->next) {
					ptr1 = ptr1->next;
					ptr2 = ptr2->next;
				}
				ptr2->next = NULL;
				break;
			}
		}
	}

	_free(start);
	
	return 0;
}

