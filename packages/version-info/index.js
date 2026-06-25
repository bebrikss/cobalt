import { existsSync }  from 'node:fs';
import { join, parse } from 'node:path';
import { cwd }         from 'node:process';
import { readFile }    from 'node:fs/promises';

const findFile = (file) => {
    let dir = cwd();
    while (dir !== parse(dir).root) {
        if (existsSync(join(dir, file))) {
            return dir;
        }
        dir = join(dir, '../');
    }
}

const pack = findFile('package.json');

const readGit = (filename) => {
    return readFile(join('/app', filename), 'utf8').catch(() => '');
}

export const getCommit = async () => 'unknown';

export const getBranch = async () => 'main';

export const getRemote = async () => 'imputnet/cobalt';

export const getVersion = async () => {
    if (!pack) {
        return '10.0.0';
    }
    try {
        const { version } = JSON.parse(
            await readFile(join(pack, 'package.json'), 'utf8')
        );
        return version;
    } catch {
        return '10.0.0';
    }
}
