import { uniqueArray } from '@/utils';
import { dict } from '@/api/sys';

interface DictionaryItem {
  label: string
  value: string
}

const codeTypesMap = new Map();
let codeQueueArr: string[] = [];

function getResultFromMap(arr: string[]): Promise<any> {
  const promiseArr = arr.map((code) => codeTypesMap.get(code));
  return Promise.all(promiseArr).then((res) => {
    const obj: Record<string, any> = {};
    res.forEach((result, index) => {
      const code = arr[index];
      obj[code] = result.data.value.result ?? [];
    });
    return Promise.resolve(obj);
  });
}

function query(typeCodes: string[]): void {
  typeCodes.forEach((code) => {
    const promise = $api(dict, {
      code,
    });
    codeTypesMap.set(code, promise);
  });
}

function get(code: string | string[]): Promise<DictionaryItem[]> {
  const codes = Array.isArray(code) ? code : [code];
  codeQueueArr.push(...codes);
  codeQueueArr = uniqueArray(codeQueueArr);
  return new Promise((resolve) => {
    setTimeout(() => {
      const copies = codeQueueArr.slice(0);
      codeQueueArr.length = 0;
      const notYet = copies.filter((code) => !codeTypesMap.has(code));
      if (notYet.length !== 0) {
        query(notYet);
      }
      getResultFromMap(codes).then((obj) => {
        resolve(obj);
      });
    });
  });
}

function getDic(code: string, filterArr: string[] = []): Ref<DictionaryItem[]> {
  const arr: Ref<DictionaryItem[]> = ref([]);
  get(code).then((res: Record<string, any>) => {
    if (filterArr.length > 0) {
      arr.value = res[code].filter((item: any) => filterArr.includes(item.value));
    } else {
      arr.value = res[code];
    }
  });
  return arr;
}

export default getDic;
