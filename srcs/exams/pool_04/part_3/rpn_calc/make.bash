#!/bin/bash

clang -Wall -Werror -Wextra rpn_calc.c -o rpn || exit 100
./rpn > real
./rpn "1 2 3 4 +" >> real
./rpn "1 2 * 3 * 4 -" >> real
./rpn "5 10 9 / - 50 *" >> real
./rpn "5 4 + 9 * 6 3 - %" >> real
./rpn "29 7 6 * - 5 + 92 + 2 /" >> real
./rpn "10 3 %" >> real
./rpn "3 4 + 10 * 4 %" >> real

clang -Wall -Werror -Wextra -I $1/rpn_calc/*.h $1/rpn_calc/*.c -o rpn2
./rpn2 > fake
./rpn2 "1 2 3 4 +" >> fake
./rpn2 "1 2 * 3 * 4 -" >> fake
./rpn2 "5 10 9 / - 50 *" >> fake
./rpn2 "5 4 + 9 * 6 3 - %" >> fake
./rpn2 "29 7 6 * - 5 + 92 + 2 /" >> fake
./rpn2 "10 3 %" >> fake
./rpn2 "3 4 + 10 * 4 %" >> fake

bash leaks.bash rpn2 0 "1 2 * 3 * 4 -" > /dev/null 2>&1
diff -y --suppress-common-lines real fake > __diff

rm -rf rpn rpn2 real fake
