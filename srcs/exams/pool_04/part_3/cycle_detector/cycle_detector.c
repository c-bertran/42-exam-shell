#include <stdlib.h>
#include "ft_list.h"

int cycle_detector(const t_list *list) {
	const t_list *slow = list;
	const t_list *fast = list;

	while (fast && fast->next) {
		slow = slow->next;
		fast = fast->next->next;
		if (slow == fast) {
			return 1;
		}
	}
	return 0;
}
