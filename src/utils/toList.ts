export default function toList (arg: any){
  return Array.isArray(arg) ? arg : [arg];
}