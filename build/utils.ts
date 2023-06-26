import path from 'path';

function firstUpperCase(str :string) :string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resolvePath(p :string) :string {
  return path.resolve(__dirname, p);
}

export {
  firstUpperCase,
  resolvePath
};
