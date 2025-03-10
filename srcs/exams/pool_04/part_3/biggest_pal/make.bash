#!/bin/bash

clang -Wall -Werror -Wextra biggest_pal.c -o printMemory || exit 100
./printMemory abcba > real
./printMemory abcba abcba >> real
./printMemory aooibdaoiwhoihwdoinzeldaisaboyobasiadlezfdsfnslk >> real
./printMemory "emileericnotrevaletallatelavertoncireelime" >> real
./printMemory "rt5y00kf32fdh5evalavegpz3fxuq3xidym5ntf6j29qpqc0redeceder0nbg5nr9n4qbgku980wjyjcd64ti50fuzz8e2gemtrqmkqwvm03hn4zjuidzrya9kfh02v" >> real

clang -Wall -Werror -Wextra -I $1/biggest_pal/*.h $1/biggest_pal/*.c -o printMemory2
./printMemory2 abcba > fake
./printMemory2 abcba abcba >> fake
./printMemory2 aooibdaoiwhoihwdoinzeldaisaboyobasiadlezfdsfnslk >> fake
./printMemory2 "emileericnotrevaletallatelavertoncireelime" >> fake
./printMemory2 "rt5y00kf32fdh5evalavegpz3fxuq3xidym5ntf6j29qpqc0redeceder0nbg5nr9n4qbgku980wjyjcd64ti50fuzz8e2gemtrqmkqwvm03hn4zjuidzrya9kfh02v" >> fake
diff -y --suppress-common-lines real fake > __diff

rm -rf printMemory printMemory2 real fake
