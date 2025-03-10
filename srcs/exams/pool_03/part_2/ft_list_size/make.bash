#!/bin/bash

clang -Wall -Werror -Wextra ft_list_size.c main.c -o listSize || exit 100
./listSize 1 > real
./listSize 5 >> real
./listSize 7 >> real
./listSize 42 >> real

clang -Wall -Werror -Wextra $1/ft_list_size/ft_list_size.c main.c -o listSize2
./listSize2 1 > fake
./listSize2 5 >> fake
./listSize2 7 >> fake
./listSize2 42 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash listSize2 0 7 > /dev/null 2>&1

rm -rf listSize listSize2 real fake
