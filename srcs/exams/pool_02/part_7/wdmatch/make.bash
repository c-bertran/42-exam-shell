#!/bin/bash

clang -Wall -Werror -Wextra wdmatch.c main.c -o wdMatch || exit 100
./wdMatch "hello world" "hello world" > real
./wdMatch "" "" >> real
./wdMatch "wonderful" "wonderfulwonderful" >> real
./wdMatch "wondertime" "wonderful" >> real
./wdMatch "behavior" "declared" >> real
./wdMatch "  wou    wah   wi" "  wou    wah  X wi" >> real

clang -Wall -Werror -Wextra $1/wdmatch/wdmatch.c main.c -o wdMatch2
./wdMatch2 "hello world" "hello world" > fake
./wdMatch2 "" "" >> fake
./wdMatch2 "wonderful" "wondertime" >> fake
./wdMatch2 "wondertime" "wonderfulwonderful" >> fake
./wdMatch2 "behavior" "declared" >> fake
./wdMatch2 "  wou    wah   wi" "  wou    wah  X wi" >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf wdMatch wdMatch2 real fake
