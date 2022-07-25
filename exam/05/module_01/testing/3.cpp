#include "Fwoosh.hpp"

void    isConst(std::string& str) {
    std::cout << str;
}

int main(void)
{
    Fwoosh richard;
    isConst(richard.getName());
    
    return 0;
}
