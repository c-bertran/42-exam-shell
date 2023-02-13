Assignment name  : brainfuck
Expected files   : *.c, *.h
Allowed functions: write, malloc, free
--------------------------------------------------------------------------------

Write a Brainfuck interpreter program.
The source code will be specified as the first parameter.
The code will always be valid, no more than 4096 operations.
"Brainfuck" is a minimalist language. It consists of an array of bytes (in our case, say 2048 bytes) initialized with zero and a pointer to its first byte.
Each statement consists of one character:
- '>' increase the pointer;
- '<' decrease the pointer;
- '+' to increment the specified byte;
- '-' reduce the specified byte;
- '.' print the specified byte to the standard output;
- '[' jump to the corresponding ']' if the specified byte is 0 (at startup);
- ']' jump to the corresponding '[' if the byte specified is not 0 (at the end).
Any other character is a comment.

Examples:
$>./brainfuck "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>." | cat -e
Hello World!$
$>./brainfuck "+++++[>++++[>++++H>+++++i<<-]>>>++\n<<<<-]>>--------.>+++++.>." | cat -e
Hi$
$>./brainfuck | cat -e
$