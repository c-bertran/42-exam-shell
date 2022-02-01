#ifndef ASPELL_HPP
# define ASPELL_HPP
# include <string>
# include <iostream>
# include "ATarget.hpp"

class ATarget;

class ASpell
{
	protected:
		std::string name;
		std::string effects;

	public:
		ASpell();
		ASpell(const std::string &, const std::string &);
		ASpell(const ASpell &);
		virtual ~ASpell();
		ASpell	&operator=(const ASpell &);
		
		const std::string	&getName() const;
		const std::string	&getEffects() const;
		virtual ASpell		*clone() const = 0;
		void				launch(const ATarget &) const;
};

#endif
