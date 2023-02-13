#!/bin/bash

clang -Wall -Werror -Wextra main.c -o maxlenoc || exit 100
./maxlenoc > real
./maxlenoc one two three >> real
./maxlenoc "   " "        " "    " "                  " "        " >> real
./maxlenoc bosdsdfnjodur atehhellosd afkuonjosurafg headfgllosf fghellosag afdfbosnjourafg >> real
./maxlenoc "je suis " "suis content   d'être" "ici et pas" " ailleurs" >> real

clang -Wall -Werror -Wextra $1/str_maxlenoc/str_maxlenoc.c -o maxlenoc2
./maxlenoc2 > fake
./maxlenoc2 one two three >> fake
./maxlenoc2 "   " "        " "    " "                  " "        " >> fake
./maxlenoc2 bosdsdfnjodur atehhellosd afkuonjosurafg headfgllosf fghellosag afdfbosnjourafg >> fake
./maxlenoc2 "je suis " "suis content   d'être" "ici et pas" " ailleurs" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash maxlenoc2 0 bonjour salut bonjour bonjour > /dev/null 2>&1

rm -rf maxlenoc maxlenoc2 real fake
