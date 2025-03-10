#!/bin/bash

clang -Wall -Werror -Wextra ft_print_numbers.c main.c -o printNumbers || exit 100
./printNumbers > real
./printNumbers one >> real

clang -Wall -Werror -Wextra $1/ft_print_numbers/ft_print_numbers.c main.c -o printNumbers2
./printNumbers2 > fake
./printNumbers2 one >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf printNumbers printNumbers2 real fake
