#!/bin/bash

clang -Wall -Wextra -Werror -I ft_list.h ft_list_foreach.c main.c -o ftListForeach || exit 100
./ftListForeach 1 > real
./ftListForeach 5 >> real
./ftListForeach 7 >> real
./ftListForeach 42 >> real

clang -Wall -Wextra -Werror -I $1/ft_list_foreach/ft_list.h $1/ft_list_foreach/ft_list_foreach.c main.c -o ftListForeach2
./ftListForeach2 1 > fake
./ftListForeach2 5 >> fake
./ftListForeach2 7 >> fake
./ftListForeach2 42 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf ftListForeach ftListForeach2 real fake
