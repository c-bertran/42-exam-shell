#!/bin/bash

clang -Wall -Werror -Wextra main.c -o addPrimeSum || exit 100
./addPrimeSum > real
./addPrimeSum one two >> real
./addPrimeSum -10 >> real
./addPrimeSum 1 >> real
./addPrimeSum 24 >> real
./addPrimeSum 78 >> real
./addPrimeSum 404 >> real

clang -Wall -Werror -Wextra $1/add_prime_sum/add_prime_sum.c -o addPrimeSum2
./addPrimeSum2 > fake
./addPrimeSum2 one two >> fake
./addPrimeSum2 -10 >> fake
./addPrimeSum2 1 >> fake
./addPrimeSum2 24 >> fake
./addPrimeSum2 78 >> fake
./addPrimeSum2 404 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash addPrimeSum2 0 78 > /dev/null 2>&1

rm -rf addPrimeSum addPrimeSum2 real fake
