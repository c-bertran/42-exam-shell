#!/bin/bash

clang -Wall -Wextra -Werror -I ft_list.h ft_list_remove_if.c main.c -o ftListRemoveIf || exit 100
./ftListRemoveIf 1 5 > real
./ftListRemoveIf 5 3 >> real
./ftListRemoveIf 7 0 >> real
./ftListRemoveIf 42 26 >> real
./ftListRemoveIf 0 5 >> real

clang -Wall -Wextra -Werror -I ft_list.h $1/ft_list_remove_if/ft_list_remove_if.c main.c -o ftListRemoveIf2
./ftListRemoveIf2 1 5 > fake
./ftListRemoveIf2 5 3 >> fake
./ftListRemoveIf2 7 0 >> fake
./ftListRemoveIf2 42 26 >> fake
./ftListRemoveIf2 0 5 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftListRemoveIf2 0 5 3 > /dev/null 2>&1

rm -rf ftListRemoveIf ftListRemoveIf2 real fake
