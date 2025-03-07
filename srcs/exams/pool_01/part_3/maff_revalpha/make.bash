#!/bin/bash

clang -Wall -Werror -Wextra maff_revalpha.c -o maff || exit 100
./maff "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./maff one two >> real
./maff >> real

clang -Wall -Werror -Wextra $1/maff_revalpha/maff_revalpha.c -o maff2
./maff2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./maff2 one two >> fake
./maff2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf maff maff2 real fake
