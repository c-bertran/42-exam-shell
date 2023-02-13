import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, PathLike, readdirSync, statSync } from 'fs';

const copyDirSync = (src: PathLike, dest: PathLike, mode?: number | undefined): void => {
	const exists = existsSync(src);
	const stats = exists && statSync(src);
	const isDirectory = exists && stats && stats.isDirectory();
	if (isDirectory) {
		mkdirSync(dest);
		readdirSync(src).forEach((childItemName) => copyDirSync(resolve(src as string, childItemName), resolve(dest as string, childItemName)));
	} else
		copyFileSync(src, dest, mode);
};

export default copyDirSync;