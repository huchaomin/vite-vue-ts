import {
  readdirSync, statSync,
} from 'fs';
import path from 'path';
import { firstUpperCase, resolvePath } from './utils.ts';

const piniaStoreKeys :string[] = [];
function fileRecursion(filePath :string) :void {
  const files = readdirSync(filePath);
  files.forEach((fileName) => {
    const fileP = path.join(filePath, fileName);
    const stats = statSync(fileP);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      piniaStoreKeys.push(path.basename(fileP, '.ts'));
    }
    if (isDir) {
      fileRecursion(fileP);
    }
  });
}

fileRecursion(resolvePath(__dirname, '../src/store/modules'));
const customerImport = {};

// 自动引入pinia的store
piniaStoreKeys.forEach((key) => {
  customerImport[`@/store/modules/${key}`] = [
    ['default', `use${firstUpperCase(key)}Store`],
  ];
});
export default customerImport;
