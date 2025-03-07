#!/bin/bash

clang -Wall -Werror -Wextra hello.c -o hello || exit 100
./hello "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./hello one two >> real
./hello >> real

clang -Wall -Werror -Wextra $1/hello/hello.c -o hello2
./hello2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./hello2 one two >> fake
./hello2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf hello hello2 real fake
