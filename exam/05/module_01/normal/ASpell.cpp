/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ASpell.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adbenoit <adbenoit@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/14 22:07:02 by adbenoit          #+#    #+#             */
/*   Updated: 2021/10/14 23:03:38 by adbenoit         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ASpell.hpp"

ASpell::ASpell() {}

ASpell::ASpell(const std::string &n, const std::string &e) :
name(n), effects(e) {}

ASpell::ASpell(const ASpell &x) :
name(x.name), effects(x.effects) {}

ASpell::~ASpell() {}

ASpell&	ASpell::operator=(const ASpell &x) {
    this->name = x.getName();
    this->effects = x.getEffects();
    return (*this);
}

const std::string&	ASpell::getName() const {
    return (this->name);
}

const std::string&	ASpell::getEffects() const {
    return (this->effects);
}

void    ASpell::launch(const ATarget &target) const {
    target.getHitBySpell(*this);
}

