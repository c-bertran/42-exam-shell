#ifndef ATARGET_HPP
# define ATARGET_HPP
# include "ASpell.hpp"

class ASpell;

class ATarget
{
	protected:
		std::string type;

	public:
		ATarget();
		ATarget(const std::string &);
		ATarget(const ATarget &);
		virtual ~ATarget();
		ATarget	&operator=(const ATarget &);
		
		const std::string	&getType() const;
		virtual ATarget		*clone() const = 0;
		void				getHitBySpell(const ASpell &) const;
};

#endif
