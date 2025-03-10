#!/bin/bash

clang -Wall -Werror -Wextra -I ft_list.h cycle_detector.c main.c -o cycleDetector || exit 100

# Test cases for cycle_detector
./cycleDetector 1 2 3 4 5 > real
./cycleDetector 1 2 3 2 4 5 >> real
./cycleDetector 1 2 3 4 5 1 >> real
./cycleDetector 1 2 3 4 5 5 >> real
./cycleDetector 1 2 3 4 4 >> real
./cycleDetector 1 2 3 3 4 5 >> real

clang -Wall -Werror -Wextra -I $1/cycle_detector/*.h $1/cycle_detector/*.c -o cycleDetector2

# Test cases for cycle_detector
./cycleDetector2 1 2 3 4 5 > fake
./cycleDetector2 1 2 3 2 4 5 >> fake
./cycleDetector2 1 2 3 4 5 1 >> fake
./cycleDetector2 1 2 3 4 5 5 >> fake
./cycleDetector2 1 2 3 4 4 >> fake
./cycleDetector2 1 2 3 3 4 5 >> fake

bash leaks.bash cycleDetector2 0 1 2 3 4 5 > /dev/null 2>&1
diff -y --suppress-common-lines real fake > __diff

rm -rf cycleDetector cycleDetector2 real fake
