#!/bin/bash

clang -Wall -Werror -Wextra main.c -o epurStr || exit 100
./epurStr > real
./epurStr one two >> real
./epurStr 42 >> real
./epurStr "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real
./epurStr "            cette phrase ne cache rien              " >> real
./epurStr "       paqe fwtdjetyi	ytjn 			ytjoeyjne 		 jeyj	  	 " >> real

clang -Wall -Werror -Wextra $1/epur_str/epur_str.c -o epurStr2
./epurStr2 > fake
./epurStr2 one two >> fake
./epurStr2 42 >> fake
./epurStr2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake
./epurStr2 "            cette phrase ne cache rien              " >> fake
./epurStr2 "       paqe fwtdjetyi	ytjn 			ytjoeyjne 		 jeyj	  	 " >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash epurStr2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf epurStr epurStr2 real fake
