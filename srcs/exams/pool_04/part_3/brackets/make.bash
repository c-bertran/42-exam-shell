#!/bin/bash

clang -Wall -Werror -Wextra main.c -o brackets || exit 100
./brackets > real
./brackets "[hello]" >> real
./brackets "{[1 + 2]}(([-1]))" >> real
./brackets "{[1 + 2]}(([-1]))" "[hello]" >> real
./brackets "{))" "[hello]" >> real
./brackets "{[(0 + 0)(1 + 1)](3*(-1)){()}}" >> real
./brackets "[[[]({{}}])" >> real

clang -Wall -Werror -Wextra $1/brackets/*.c -I $1/brackets/ -o brackets2
./brackets2 > fake
./brackets2 "[hello]" >> fake
./brackets2 "{[1 + 2]}(([-1]))" >> fake
./brackets2 "{[1 + 2]}(([-1]))" "[hello]" >> fake
./brackets2 "{))" "[hello]" >> fake
./brackets2 "{[(0 + 0)(1 + 1)](3*(-1)){()}}" >> fake
./brackets2 "[[[]({{}}])" >> fake

bash leaks.bash brackets2 1 "([)]" > /dev/null 2>&1
diff -y --suppress-common-lines real fake > __diff
rm -rf brackets brackets2 real fake
