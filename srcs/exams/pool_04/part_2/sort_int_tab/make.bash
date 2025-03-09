#!/bin/bash

clang -Wall -Wextra -Werror sort_int_tab.c main.c -o sortIntTab || exit 100
./sortIntTab 12 52 19 82 44 21 36 32 90 37 89 14 79 > real
./sortIntTab 8 -7 69 -50 28 34 -38 37 -47 >> real
./sortIntTab 15 -39 107 119 93 53 -36 81 131 69 -1 129 -52 74 47 -26 >> real
./sortIntTab 48 110 60 18 -29 74 26 -62 -7 36 90 -64 35 126 91 24 -9 79 -32 37 -10 9 17 137 -56 14 11 46 64 -33 5 69 54 95 -31 -78 -81 -35 122 -85 -57 -73 87 -21 101 130 98 112 107 >> real

clang -Wall -Wextra -Werror $1/sort_int_tab/sort_int_tab.c main.c -o sortIntTab2
./sortIntTab2 12 52 19 82 44 21 36 32 90 37 89 14 79 > fake
./sortIntTab2 8 -7 69 -50 28 34 -38 37 -47 >> fake
./sortIntTab2 15 -39 107 119 93 53 -36 81 131 69 -1 129 -52 74 47 -26 >> fake
./sortIntTab2 48 110 60 18 -29 74 26 -62 -7 36 90 -64 35 126 91 24 -9 79 -32 37 -10 9 17 137 -56 14 11 46 64 -33 5 69 54 95 -31 -78 -81 -35 122 -85 -57 -73 87 -21 101 130 98 112 107 >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf sortIntTab sortIntTab2 real fake
