#include "Dummy.hpp"

void    isConst(std::string& str) {
    std::cout << str;
}

int main(void)
{
    Dummy richard;
    isConst(richard.getType());
    
    return 0;
}
