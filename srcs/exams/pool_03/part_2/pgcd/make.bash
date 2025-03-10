#!/bin/bash

clang -Wall -Werror -Wextra main.c -o pgcd || exit 100
./pgcd 1 2 > real
./pgcd 5 12 >> real
./pgcd 42 20 >> real
./pgcd 98 539 >> real
./pgcd >> real
./pgcd 1 >> real
./pgcd 1 2 3 >> real

clang -Wall -Werror -Wextra $1/pgcd/pgcd.c -o pgcd2
./pgcd2 1 2 > fake
./pgcd2 5 12 >> fake
./pgcd2 42 20 >> fake
./pgcd2 98 539 >> fake
./pgcd2 >> fake
./pgcd2 1 >> fake
./pgcd2 1 2 3 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash pgcd2 0 5 12 > /dev/null 2>&1

rm -rf pgcd pgcd2 real fake
