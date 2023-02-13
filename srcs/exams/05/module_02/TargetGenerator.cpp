#include "TargetGenerator.hpp"

TargetGenerator::TargetGenerator() {}
TargetGenerator::~TargetGenerator() {}

void    TargetGenerator::learnTargetType(ATarget *target)
{
    for (size_t i = 0; i < this->generator.size(); i++)
        if (this->generator[i]->getType() == target->getType())
            return ;
    generator.push_back(target->clone());
}

void    TargetGenerator::forgetTargetType(const std::string &type)
{
    for (std::vector<ATarget *>::iterator it = generator.begin(); it != generator.end(); it++)
        if ((*it)->getType() == type)
        {
            delete *it;
            this->generator.erase(it);
            return ;
        }
}

ATarget *TargetGenerator::createTarget(const std::string &type)
{
    for (size_t i = 0; i < this->generator.size(); i++)
        if (this->generator[i]->getType() == type)
            return this->generator[i];
    return (0);
}
