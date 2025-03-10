#!/bin/bash

clang -Wall -Werror -Wextra ft_swap.c main.c -o ft_swap || exit 100
./ft_swap 5 10 > real
./ft_swap 25 785 >> real
./ft_swap 24 42 >> real
./ft_swap 789 3471365 >> real

clang -Wall -Werror -Wextra $1/ft_swap/ft_swap.c main.c -o ft_swap2
./ft_swap2 5 10 > fake
./ft_swap2 25 785 >> fake
./ft_swap2 24 42 >> fake
./ft_swap2 789 3471365 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ft_swap2 0 5 10 > /dev/null 2>&1

rm -rf ft_swap ft_swap2 real fake
