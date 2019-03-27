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
