#!/bin/bash

clang -Wall -Werror -Wextra sort_list.c main.c -I ./ -o sortList || exit 100
./sortList 5 42 > real
./sortList 6 748485 >> real
./sortList 42 23 >> real
./sortList 55 65100 >> real

clang -Wall -Werror -Wextra $1/sort_list/sort_list.c main.c -I ./ -o sortList2
./sortList2 5 42 > fake
./sortList2 6 748485 >> fake
./sortList2 42 23 >> fake
./sortList2 55 65100 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash sortList2 0 5 42 > /dev/null

rm -rf sortList sortList2 real fake
