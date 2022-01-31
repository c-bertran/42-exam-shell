#ifndef __WARLOCK_HPP
# include <iostream>
# include <string>

class Warlock
{
	private:
		std::string name;
		std::string title;
		Warlock();
		Warlock(Warlock &obj);
		Warlock &operator=(Warlock &obj);
	public:
		Warlock(const std::string name, const std::string title);
		~Warlock();
	public:
		const std::string	&getName() const;
		const std::string	&getTitle() const;
		void	setTitle(const std::string &str);
		void	introduce() const;
};

#endif
