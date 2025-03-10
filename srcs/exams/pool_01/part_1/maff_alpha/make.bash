#!/bin/bash

clang -Wall -Werror -Wextra maff_alpha.c -o maffA || exit 100
./maffA "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./maffA one two >> real
./maffA >> real

clang -Wall -Werror -Wextra $1/maff_alpha/maff_alpha.c -o maffA2
./maffA2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./maffA2 one two >> fake
./maffA2 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf maffA maffA2 real fake
