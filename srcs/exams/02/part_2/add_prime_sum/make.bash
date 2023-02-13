#!/bin/bash

clang -Wall -Werror -Wextra main.c -o addPrimeSub || exit 100
./addPrimeSub > real
./addPrimeSub one two >> real
./addPrimeSub -10 >> real
./addPrimeSub 1 >> real
./addPrimeSub 24 >> real
./addPrimeSub 78 >> real
./addPrimeSub 404 >> real

clang -Wall -Werror -Wextra $1/add_prime_sub/add_prime_sub.c -o addPrimeSub2
./addPrimeSub2 > fake
./addPrimeSub2 one two >> fake
./addPrimeSub2 -10 >> real
./addPrimeSub2 1 >> fake
./addPrimeSub2 24 >> fake
./addPrimeSub2 78 >> fake
./addPrimeSub2 404 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash addPrimeSub2 0 78 > /dev/null 2>&1

rm -rf addPrimeSub addPrimeSub2 real fake
