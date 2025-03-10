#!/bin/bash

clang -Wall -Werror -Wextra main.c -o rev_print || exit 100
./rev_print > real
./rev_print "abc" >> real
./rev_print "abc" "abc" >> real
./rev_print "page" >> real
./rev_print "fwtdjetyi" >> real
./rev_print "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real

clang -Wall -Werror -Wextra $1/rev_print/rev_print.c -o rev_print2
./rev_print2 > fake
./rev_print2 "abc" >> fake
./rev_print2 "abc" "abc" >> fake
./rev_print2 "page" >> fake
./rev_print2 "fwtdjetyi" >> fake
./rev_print2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash rev_print2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf rev_print rev_print2 real fake
