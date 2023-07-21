import path from 'path';

function firstUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resolvePath(dirname: string, p: string): string {
  return path.resolve(dirname, p);
}

export {
  firstUpperCase,
  resolvePath,
};
