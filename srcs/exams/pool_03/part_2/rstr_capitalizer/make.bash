#!/bin/bash

clang -Wall -Werror -Wextra main.c -o rstrCapitalizer || exit 100
./rstrCapitalizer > real
./rstrCapitalizer one two >> real
./rstrCapitalizer "SecONd teST A LITtle BiT   Moar comPLEX" "   But... This iS not THAT COMPLEX" "     Okay, this is the last 1239809147801 but not    the least    t" >> real
./rstrCapitalizer "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" "               cette phrase ne cache rien" >> real

clang -Wall -Werror -Wextra $1/rstr_capitalizer/rstr_capitalizer.c -o rstrCapitalizer2
./rstrCapitalizer2 > fake
./rstrCapitalizer2 one two >> fake
./rstrCapitalizer2 "SecONd teST A LITtle BiT   Moar comPLEX" "   But... This iS not THAT COMPLEX" "     Okay, this is the last 1239809147801 but not    the least    t" >> fake
./rstrCapitalizer2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" "               cette phrase ne cache rien" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash rstrCapitalizer2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" "               cette phrase ne cache rien" > /dev/null 2>&1

rm -rf rstrCapitalizer rstrCapitalizer2 real fake
