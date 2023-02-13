#!/bin/bash

clang -Wall -Wextra -D REAL main.c -o real_printf || exit 100
./real_printf | cat -e > real

clang -Wall -Werror -Wextra $1/ft_printf/ft_printf.c main.c -o ft_printf
./ft_printf | cat -e > fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ft_printf 0 

rm -rf fake real ft_printf real_printf
