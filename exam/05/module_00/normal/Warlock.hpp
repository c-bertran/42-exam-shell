#ifndef __WARLOCK_HPP
# include <iostream>
# include <string>

class Warlock
{
	private:
		std::string name;
		std::string title;
	private:
		Warlock();
		Warlock(const Warlock &);
		Warlock &operator=(const Warlock &);
	public:
		Warlock(const std::string &, const std::string &);
		~Warlock();
	public:
		const std::string	&getName() const;
		const std::string	&getTitle() const;
		void	setTitle(const std::string &);
		void	introduce() const;
};

#endif
