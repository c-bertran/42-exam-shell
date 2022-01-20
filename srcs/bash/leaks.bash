#!bin/bash
valgrind --tool=memcheck --leak-check=full --leak-resolution=high --show-reachable=yes --xml=yes --xml-file=valgrind.xml ./$1 $2
