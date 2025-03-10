#!/bin/bash

clang -Wall -Werror -Wextra main.c -o strCapitalizer || exit 100
./strCapitalizer > real
./strCapitalizer one two >> real
./strCapitalizer "SecONd teST A LITtle BiT   Moar comPLEX" "   But... This iS not THAT COMPLEX" "     Okay, this is the last 1239809147801 but not    the least    t" >> real
./strCapitalizer "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" "               cette phrase ne cache rien" >> real

clang -Wall -Werror -Wextra $1/str_capitalizer/str_capitalizer.c -o strCapitalizer2
./strCapitalizer2 > fake
./strCapitalizer2 one two >> fake
./strCapitalizer2 "SecONd teST A LITtle BiT   Moar comPLEX" "   But... This iS not THAT COMPLEX" "     Okay, this is the last 1239809147801 but not    the least    t" >> fake
./strCapitalizer2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" "               cette phrase ne cache rien" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash strCapitalizer2 0 "SecONd teST A LITtle BiT   Moar comPLEX" "   But... This iS not THAT COMPLEX" "     Okay, this is the last 1239809147801 but not    the least    t" > /dev/null 2>&1

rm -rf strCapitalizer strCapitalizer2 real fake
