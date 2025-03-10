#!/bin/bash

clang -Wall -Werror -Wextra aff_first_param.c -o affFirstParam || exit 100
./affFirstParam "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./affFirstParam one two >> real
./affFirstParam >> real

clang -Wall -Werror -Wextra $1/aff_first_param/aff_first_param.c -o affFirstParam2
./affFirstParam2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./affFirstParam2 one two >> fake
./affFirstParam2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf affFirstParam affFirstParam2 real fake
