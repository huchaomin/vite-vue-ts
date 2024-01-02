import path from 'path'
import fg from 'fast-glob'
import { firstUpperCase } from './utils.ts'

const piniaStoreKeys: string[] = []
// function fileRecursion(filePath :string) :void {
//   const files = readdirSync(filePath);
//   files.forEach((fileName) => {
//     const fileP = path.join(filePath, fileName);
//     const stats = statSync(fileP);
//     const isFile = stats.isFile();
//     const isDir = stats.isDirectory();
//     if (isFile) {
//       piniaStoreKeys.push(path.basename(fileP, '.ts'));
//     }
//     if (isDir) {
//       fileRecursion(fileP);
//     }
//   });
// }
// fileRecursion(resolvePath(__dirname, '../src/store/modules'));

const files = fg.globSync('src/store/modules/*.ts') // 当前工作目录为根目录

files.forEach((p) => {
  piniaStoreKeys.push(path.basename(p, '.ts'))
})

const customerImport = {}

// 自动引入pinia的store
piniaStoreKeys.forEach((key) => {
  customerImport[`@/store/modules/${key}`] = [['default', `use${firstUpperCase(key)}Store`]]
})
export default customerImport
