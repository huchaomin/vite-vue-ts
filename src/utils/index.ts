function firstUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export {
  firstUpperCase,
  uniqueArray,
};
