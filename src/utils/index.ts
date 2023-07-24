function firstUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

function downloadBlob(blob: Blob, filename: string): void {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export {
  firstUpperCase,
  uniqueArray,
  downloadBlob,
};
