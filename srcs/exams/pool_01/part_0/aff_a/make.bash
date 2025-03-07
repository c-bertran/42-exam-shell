#!/bin/bash

clang -Wall -Werror -Wextra aff_a.c -o affA || exit 100
./affA "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./affA "cette phrse ne cche rien" >> real
./affA "               cette phrse ne cache rien" >> real
./affA "                       " >> real
./affA one two >> real
./affA >> real

clang -Wall -Werror -Wextra $1/aff_a/aff_a.c -o affA2
./affA2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./affA2 "cette phrse ne cche rien" >> fake
./affA2 "               cette phrse ne cache rien" >> fake
./affA2 "                       " >> fake
./affA2 one two >> fake
./affA2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf affA affA2 real fake
