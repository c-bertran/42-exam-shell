#!/bin/bash

clang -Wall -Werror -Wextra fizzbuzz.c -o fizzbuzz || exit 100
./fizzbuzz > real

clang -Wall -Werror -Wextra $1/fizzbuzz/fizzbuzz.c -o fizzbuzz2
./fizzbuzz2 > fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash fizzbuzz2 > /dev/null 2>&1

rm -rf fizzbuzz fizzbuzz2 real fake
