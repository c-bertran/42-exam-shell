#include "Warlock.hpp"

int main(void)
{
    Warlock richard("Richard", "Mistress of Magma");
    Warlock bob("Bob", "Mistress of Magma");
    bob = richard;

    return 0;
}
    