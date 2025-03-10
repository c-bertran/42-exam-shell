#!/bin/bash

clang -Wall -Werror -Wextra main.c -o checkmate || exit 100
./checkmate > real
./checkmate one >> real
./checkmate "R..." "..P." "...." "K..." >> real
./checkmate "R..." "iheK" "...." "jeiR" >> real
./checkmate "R..." "iheK" "...." "jei." >> real
./checkmate "..R." ".Q.." "..BK" "...P" >> real
./checkmate "..R." ".Q.." "..BK" "..P." >> real
./checkmate "R..." "..P." ".K.." "...." >> real
./checkmate "B......." "........" ".....Q.." "........" "........" "........" "......K." "...P....." >> real
./checkmate "........" "........" ".....Q.." "........" "........" "........" "......K." "...P....." >> real

clang -Wall -Werror -Wextra $1/checkmate/*.c -I $1/checkmate/ -o checkmate2
./checkmate2 > fake
./checkmate2 one >> fake
./checkmate2 "R..." "..P." "...." "K..." >> fake
./checkmate2 "R..." "iheK" "...." "jeiR" >> fake
./checkmate2 "R..." "iheK" "...." "jei." >> fake
./checkmate2 "..R." ".Q.." "..BK" "...P" >> fake
./checkmate2 "..R." ".Q.." "..BK" "..P." >> fake
./checkmate2 "R..." "..P." ".K.." "...." >> fake
./checkmate2 "B......." "........" ".....Q.." "........" "........" "........" "......K." "...P....." >> fake
./checkmate2 "........" "........" ".....Q.." "........" "........" "........" "......K." "...P....." >> fake

bash leaks.bash checkmate2 0 "R..." "..P." "...." "K..." > /dev/null 2>&1
diff -y --suppress-common-lines real fake > __diff
rm -rf checkmate checkmate2 real fake
