#!/bin/bash

clang -Wall -Werror -Wextra only_z.c -o onlyZ || exit 100
./onlyZ "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./onlyZ one two >> real
./onlyZ >> real

clang -Wall -Werror -Wextra $1/only_z/only_z.c -o onlyZ2
./onlyZ2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./onlyZ2 one two >> fake
./onlyZ2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf onlyZ onlyZ2 real fake
