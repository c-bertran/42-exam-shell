#!/bin/bash

clang -Wall -Werror -Wextra main.c -o lastWord || exit 100
./lastWord "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./lastWord "cette phrase ne cache rien" >> real
./lastWord "               cette phrase ne cache rien" >> real
./lastWord "                       " >> real
./lastWord one two >> real
./lastWord >> real

clang -Wall -Werror -Wextra $1/last_word/last_word.c -o lastWord2
./lastWord2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./lastWord2 "cette phrase ne cache rien" >> fake
./lastWord2 "               cette phrase ne cache rien" >> fake
./lastWord2 "                       " >> fake
./lastWord2 one two >> fake
./lastWord2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash lastWord2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf lastWord lastWord2 real fake
