#!/bin/bash

clang -Wall -Werror -Wextra main.c -o expandStr || exit 100
./expandStr > real
./expandStr one two >> real
./expandStr 42 >> real
./expandStr "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real
./expandStr "            cette phrase ne cache rien              " >> real
./expandStr "       paqe fwtdjetyi	ytjn 			ytjoeyjne 		 jeyj	  	 " >> real

clang -Wall -Werror -Wextra $1/expand_str/expand_str.c -o expandStr2
./expandStr2 > fake
./expandStr2 one two >> fake
./expandStr2 42 >> fake
./expandStr2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake
./expandStr2 "            cette phrase ne cache rien              " >> fake
./expandStr2 "       paqe fwtdjetyi	ytjn 			ytjoeyjne 		 jeyj	  	 " >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash expandStr2 0 "            cette phrase ne cache rien              " > /dev/null 2>&1

rm -rf expandStr expandStr2 real fake
