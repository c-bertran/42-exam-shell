#!/bin/bash

clang -Wall -Werror -Wextra main.c -o brainfuck || exit 100
./brainfuck > real
./brainfuck one two >> real
./brainfuck "+++++[>++++[>++++H>+++++i<<-]>>>++\n<<<<-]>>--------.>+++++.>." >> real
./brainfuck "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>." >> real
./brainfuck "++++++++[>+++++++++++++>+++++>++++>++++++++++++<<<<-]>+.+++++++++++.>-.<-.>>.>+.<.<<++++.--------.-.>>>+++.+.<<<++++.>>>+.<<<+++.---------.>>.<<++++++++.>>>+++.++++.--------.---------.<<<------." >> real
./brainfuck "++++++++++>++++++++++++++++++++++++++++++++++++++++++++++++>++++++++++[>++++++++++++++++++++++++++++++++++++++++++++++++>++++++++++[<<<. >>.+ <<<.>>>>-]<----------------------------------------------------------<<+>-]" >> real
./brainfuck "++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+>>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]<<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]" >> real

clang -Wall -Werror -Wextra $1/brainfuck/*.c -I $1/brainfuck/ -o brainfuck2
./brainfuck2 > fake
./brainfuck2 one two >> fake
./brainfuck2 "+++++[>++++[>++++H>+++++i<<-]>>>++\n<<<<-]>>--------.>+++++.>." >> fake
./brainfuck2 "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>." >> fake
./brainfuck2 "++++++++[>+++++++++++++>+++++>++++>++++++++++++<<<<-]>+.+++++++++++.>-.<-.>>.>+.<.<<++++.--------.-.>>>+++.+.<<<++++.>>>+.<<<+++.---------.>>.<<++++++++.>>>+++.++++.--------.---------.<<<------." >> fake
./brainfuck2 "++++++++++>++++++++++++++++++++++++++++++++++++++++++++++++>++++++++++[>++++++++++++++++++++++++++++++++++++++++++++++++>++++++++++[<<<. >>.+ <<<.>>>>-]<----------------------------------------------------------<<+>-]" >> fake
./brainfuck2 "++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+>>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]<<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]" >> fake

bash leaks.bash brainfuck2 1 "+++++[>++++[>++++H>+++++i<<-]>>>++\n<<<<-]>>--------.>+++++.>." > /dev/null 2>&1
diff -y --suppress-common-lines real fake > __diff
rm -rf brainfuck brainfuck2 real fake
