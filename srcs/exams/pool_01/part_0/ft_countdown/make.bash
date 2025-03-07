#!/bin/bash

clang -Wall -Werror -Wextra ft_countdown.c -o countdown || exit 100
./countdown > real
./countdown one >> real

clang -Wall -Werror -Wextra $1/ft_countdown/ft_countdown.c -o countdown2
./countdown2 > fake
./countdown2 one >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf countdown countdown2 real fake
