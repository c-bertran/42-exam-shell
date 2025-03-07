import Two from './02/definition';
import Three from './03/definition';
import Four from './04/definition';
import Five from './05/definition';
import Six from './06/definition';
import OldThree from './old_03/definition';

import PoolOne from './pool_01/definition';

import type { examDefinition } from './interface';

const examList = [
	Two,
	Three,
	OldThree,
	Four,
	Five,
	Six,
	PoolOne,
] as examDefinition[];

export default examList;
