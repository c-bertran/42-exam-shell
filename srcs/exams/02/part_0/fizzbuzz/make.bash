#!/bin/bash
set -e

clang -Wall -Werror -Wextra fizzbuzz.c -o fizzbuzz;
./fizzbuzz > real

clang -Wall -Werror -Wextra $1/fizzbuzz/fizzbuzz.c -o fizzbuzz2;
./fizzbuzz2 > fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash fizzbuzz2

rm -rf fizzbuzz fizzbuzz2 real fake
