#!/bin/bash

clang -Wall -Werror -Wextra main.c -o inter || exit 100
./inter zpadinton "paqefwtdjetyiytjneytjoeyjnejeyj" > real
./inter ddf6vewg64f gtwthgdwthdwfteewhrtag6h4ffdhsd >> real
./inter "rien" "cette phrase ne cache rien" >> real
./inter >> real
./inter one two three >> real

clang -Wall -Werror -Wextra $1/inter/inter.c -o inter2
./inter2 zpadinton "paqefwtdjetyiytjneytjoeyjnejeyj" > fake
./inter2 ddf6vewg64f gtwthgdwthdwfteewhrtag6h4ffdhsd >> fake
./inter2 "rien" "cette phrase ne cache rien" >> fake
./inter2 >> fake
./inter2 one two three >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash inter2 0 ddf6vewg64f gtwthgdwthdwfteewhrtag6h4ffdhsd > /dev/null 2>&1

rm -rf inter inter2 real fake
