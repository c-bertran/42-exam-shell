#!/bin/bash

clang -Wall -Werror -Wextra options.c -o options || exit 100
./options > real
./options -abc -ijk >> real
./options -dodloez -hfreko >> real
./options -pboikqujr -njufwtzaqf -ikjez >> real
./options -pboikqujr -njufçwtzaqf -ikjez >> real
./options -pboikqujr -njufwtzaqf -ikjez -hpboikqujr -njufwtzaqf -ikjez >> real

clang -Wall -Werror -Wextra -I $1/options/*.h $1/options/*.c -o options2
./options2 > fake
./options2 -abc -ijk >> fake
./options2 -dodloez -hfreko >> fake
./options2 -pboikqujr -njufwtzaqf -ikjez >> fake
./options2 -pboikqujr -njufçwtzaqf -ikjez >> fake
./options2 -pboikqujr -njufwtzaqf -ikjez -hpboikqujr -njufwtzaqf -ikjez >> fake
diff -y --suppress-common-lines real fake > __diff

rm -rf options options2 real fake
