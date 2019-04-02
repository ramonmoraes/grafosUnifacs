export function toList(arg: any): any[] {
  return Array.isArray(arg) ? arg : [arg];
}

export function flat(arr: any[], result: any[] = []): any[] {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flat(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

export function isEqual(arg1: any, arg2: any): boolean {
  const keys1 = Object.keys(arg1);
  const keys2 = Object.keys(arg2);

  for (let key of keys1) {
    if (key in keys2 || keys2.includes(key)) continue;
    return false;
  }

  for (let key of keys1) {
    const keyType = typeof key;
    if (keyType === "object" && !isEqual(arg1[key], arg2[key])) {
      console.log("at recursion");
      return false;
    }

    if (Array.isArray(arg1[key]) && Array.isArray(arg2[key])) {
      const array1 = arg1[key].sort();
      const array2 = arg2[key].sort();
      if (JSON.stringify(array1) != JSON.stringify(array2)) return false;
    } else if (arg1[key] != arg2[key]) {
      console.log("at value compare", arg1[key], arg2[key]);
      return false;
    }
  }

  return true;
}
