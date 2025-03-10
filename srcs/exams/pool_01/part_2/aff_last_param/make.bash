#!/bin/bash

clang -Wall -Werror -Wextra aff_last_param.c -o affLastParam || exit 100
./affLastParam "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./affLastParam one two >> real
./affLastParam >> real

clang -Wall -Werror -Wextra $1/aff_last_param/aff_last_param.c -o affLastParam2
./affLastParam2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./affLastParam2 one two >> fake
./affLastParam2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf affLastParam affLastParam2 real fake
