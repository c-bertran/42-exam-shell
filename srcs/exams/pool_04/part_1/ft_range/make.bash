#!/bin/bash

clang -Wall -Werror -Wextra ft_range.c main.c -o range || exit 100
./range 1 2 > real
./range 5 12 >> real
./range -42 745 >> real
./range -7517 54245 >> real

clang -Wall -Werror -Wextra $1/ft_range/ft_range.c main.c -o range2
./range2 1 2 > fake
./range2 5 12 >> fake
./range2 -42 745 >> fake
./range2 -7517 54245 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash range2 0 5 12 > /dev/null 2>&1

rm -rf range range2 real fake
