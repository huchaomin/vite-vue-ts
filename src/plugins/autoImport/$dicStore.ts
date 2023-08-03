import { dict } from '@/api/sys';

interface DictionaryItem {
  label: string
  value: string
}

const codeTypesMap = new Map();

function get(code: string): PromiseLike<DictionaryItem[]> {
  if (codeTypesMap.has(code)) {
    return codeTypesMap.get(code);
  }
  const promise = $api(dict, {
    code,
  }).then(res => {
    const result = res.data.value?.result ?? [];
    return Promise.resolve(result);
  });
  codeTypesMap.set(code, promise);
  return promise;
}

function getDic(code: string, filterArr: string[] = []): Ref<DictionaryItem[]> {
  const arr: Ref<DictionaryItem[]> = ref([]);
  get(code).then((res) => {
    if (filterArr.length > 0) {
      arr.value = res.filter(item => filterArr.includes(item.value));
    } else {
      arr.value = res;
    }
  });
  return arr;
}

export default getDic;
