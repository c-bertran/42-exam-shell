#!/bin/bash

clang -Wall -Werror -Wextra aff_z.c -o affZ || exit 100
./affZ "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./affZ one two >> real
./affZ >> real

clang -Wall -Werror -Wextra $1/aff_z/aff_z.c -o affZ2
./affZ2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./affZ2 one two >> fake
./affZ2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf affZ affZ2 real fake
