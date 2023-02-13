#include "Warlock.hpp"
#include "Fwoosh.hpp"
#include "Dummy.hpp"
#include "BrickWall.hpp"
#include "Polymorph.hpp"
#include "TargetGenerator.hpp"
#include "Fireball.hpp"

int main()
{
	Warlock richard("Richard", "foo");
	
	// test copy
	Fireball *fire = new Fireball();
	BrickWall* wall = new BrickWall();
	TargetGenerator tarGen;
	tarGen.learnTargetType(wall);
	richard.learnSpell(fire);
	const std::string name(fire->getName());
	const std::string effects(fire->getEffects());
	const std::string type(wall->getType());
	delete fire;
	delete wall;
	ATarget* target = tarGen.createTarget(type);
	richard.launchSpell(name, *target);
	
	// test double
	fire = new Fireball();
	richard.learnSpell(fire);
	tarGen.learnTargetType(target);
	richard.forgetSpell(name);
	tarGen.forgetTargetType(type);
	std::cout << "have to be empy : ";
	richard.launchSpell(name, *target);
	if (tarGen.createTarget(type))
		std::cout << "is not...";
	std::cout << std::endl;
}
