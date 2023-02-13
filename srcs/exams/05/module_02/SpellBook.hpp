#ifndef SPELLBOOK_HPP
# define SPELLBOOK_HPP
# include "ASpell.hpp"
# include <vector>

class SpellBook
{
    private:
        std::vector<ASpell *> book;
    private:
        SpellBook(const SpellBook &);
        SpellBook   &operator= (const SpellBook &);
    
    public:
        SpellBook();
        ~SpellBook();

        void    learnSpell(ASpell *);
        void    forgetSpell(const std::string &);
        ASpell  *createSpell(const std::string &);
};

#endif
