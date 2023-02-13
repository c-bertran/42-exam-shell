#include "Warlock.hpp"

void    isConst(std::string& str) {
    std::cout << str;
}

int main(void)
{
    Warlock richard("Richard", "Mistress of Magma");
    isConst(richard.getName());
    
    return 0;
}
