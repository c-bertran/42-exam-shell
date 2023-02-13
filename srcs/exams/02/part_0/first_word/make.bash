#!/bin/bash

clang -Wall -Werror -Wextra first_word.c -o firstWord || exit 100
./firstWord "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./firstWord "cette phrase ne cache rien" >> real
./firstWord "               cette phrase ne cache rien" >> real
./firstWord "                       " >> real
./firstWord one two >> real
./firstWord >> real

clang -Wall -Werror -Wextra $1/first_word/first_word.c -o firstWord2
./firstWord2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./firstWord2 "cette phrase ne cache rien" >> fake
./firstWord2 "               cette phrase ne cache rien" >> fake
./firstWord2 "                       " >> fake
./firstWord2 one two >> fake
./firstWord2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash firstWord2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf firstWord firstWord2 real fake
