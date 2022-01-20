#!/bin/bash
set -e

clang -Wall -Wextra -D REAL main.c -o real_printf
./real_printf | cat -e > real

clang -Wall -Werror -Wextra render/ft_printf/ft_printf.c main.c -o ft_printf
./ft_printf | cat -e > fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ft_printf

rm -rf fake real ft_printf real_printf
