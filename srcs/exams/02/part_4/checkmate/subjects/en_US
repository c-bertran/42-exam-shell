Assignment name  : checkmate 
Expected files   : *.c, *.h
Allowed functions: write, malloc, free
--------------------------------------------------------------------------------

Write a program in which the arguments are taken as chessboard lines and which checks whether your king is in check.
Chess is played on a chessboard, a square board 8 squares long with certain pieces on it: king, queen, bishop, knight, rook and pawns.
In this exercise, you will play only with pawns, bishops, rooks, the queen and of course the king.
Each piece has a specific method of movement and all capture patterns are described in detail in the examples.txt file.
A piece can only capture the first enemy piece it finds on its capture patterns.
The board varies in size, but remains square. There is only one king and all other pieces are opposite. All other characters, except for the one used for the pieces, are considered empty squares.
A king is considered to be in a controlling position when another king is in a controlling position. 
An enemy piece may capture it. In this case, you will print "Success" on the standard output, followed by a line break. If not, you will print "Fail", followed by a carriage return.
If there are no arguments, the program will only print a new line.

Exemple :
$> ./checkmate '..' '.K' | cat -e
Fail$
$> ./checkmate 'R...' '..P.' '.K..' '....' | cat -e
Success$
$> ./checkmate 'R...' 'iheK' '....' 'jei.' | cat -e
Fail$
$> ./checkmate | cat -e
$
$>
