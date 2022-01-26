#!/bin/bash
if [ -z "$2" ]
then
	logFile="valgrind_0.log"
else
	logFile="valgrind_$2.log"
fi

valgrind --tool=memcheck --leak-check=full --leak-resolution=high --show-reachable=yes --track-fds=yes --log-file=$logFile ./$1 $3
