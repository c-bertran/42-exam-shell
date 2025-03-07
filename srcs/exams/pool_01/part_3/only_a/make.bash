#!/bin/bash

clang -Wall -Werror -Wextra only_a.c -o onlyA || exit 100
./onlyA "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./onlyA one two >> real
./onlyA >> real

clang -Wall -Werror -Wextra $1/only_a/only_a.c -o onlyA2
./onlyA2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./onlyA2 one two >> fake
./onlyA2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf onlyA onlyA2 real fake
