#!/bin/bash

clang -Wall -Werror -Wextra ft_itoa.c main.c -o ftItoa || exit 100
./ftItoa 44 > real
./ftItoa 0 >> real
./ftItoa 8 >> real
./ftItoa 8452 >> real
./ftItoa 71496154 >> real
./ftItoa 2000000000 >> real
./ftItoa -2000000000 >> real
./ftItoa -71496154 >> real

clang -Wall -Werror -Wextra $1/ft_itoa/ft_itoa.c main.c -o ftItoa2
./ftItoa2 44 > fake
./ftItoa2 0 >> fake
./ftItoa2 8 >> fake
./ftItoa2 8452 >> fake
./ftItoa2 71496154 >> fake
./ftItoa2 2000000000 >> fake
./ftItoa2 -2000000000 >> fake
./ftItoa2 -71496154 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftItoa2 0 71496154 > /dev/null 2>&1

rm -rf ftItoa ftItoa2 real fake
