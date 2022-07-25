#include "SpellBook.hpp"

SpellBook::SpellBook() {}
SpellBook::~SpellBook() {}

void    SpellBook::learnSpell(ASpell *spell)
{
    for (size_t i = 0; i < this->book.size(); i++)
        if (this->book[i]->getName() == spell->getName())
            return ;
    book.push_back(spell->clone());
}

void    SpellBook::forgetSpell(const std::string &name)
{
    for (std::vector<ASpell *>::iterator it = book.begin(); it != book.end(); it++)
        if ((*it)->getName() == name)
        {
            delete *it;
            this->book.erase(it);
            return ;
        }
}

ASpell  *SpellBook::createSpell(const std::string &name)
{
    for (size_t i = 0; i < this->book.size(); i++)
        if (this->book[i]->getName() == name)
            return this->book[i];
    return (0);
}
