#ifndef TARGETGENERATOR_HPP
# define TARGETGENERATOR_HPP
# include "ATarget.hpp"
# include <vector>

class TargetGenerator
{
    private:
        std::vector<ATarget *> generator;
    private:
        TargetGenerator(const TargetGenerator &);
        TargetGenerator& operator= (const TargetGenerator &);
    public:
        TargetGenerator();
        ~TargetGenerator();
        void    learnTargetType(ATarget *);
        void    forgetTargetType(const std::string &);
        ATarget *createTarget(const std::string &);
};

#endif
