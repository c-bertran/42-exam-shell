#include "Fwoosh.hpp"

Fwoosh::Fwoosh() : ASpell("Fwoosh", "fwooshed") {}
Fwoosh::~Fwoosh() {}

Fwoosh  *Fwoosh::clone() const { return (new Fwoosh(*this)); }
