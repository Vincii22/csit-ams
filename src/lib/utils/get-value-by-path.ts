export function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}
