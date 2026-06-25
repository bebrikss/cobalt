export const getCommit = async () => 'unknown';
export const getBranch = async () => 'main';
export const getRemote = async () => 'imputnet/cobalt';
export const getVersion = async () => {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const { cwd } = await import('node:process');
    try {
        const { version } = JSON.parse(
            await readFile(join(cwd(), 'package.json'), 'utf8')
        );
        return version;
    } catch {
        return '10.0.0';
    }
}
