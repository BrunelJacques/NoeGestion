

export  function hoursDelta(date1: Date, date2: Date): number {
      return Math.floor(((date2.getTime()) - (date1.getTime())) / 1000 / 60 / 60)
    }

export function deepCopy<T>(source: T): T {
  return Array.isArray(source)
  ? source.map(item => deepCopy(item))
  : source instanceof Date
  ? new Date(source.getTime())
  : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
            Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
            o[prop] = deepCopy((source as { [key: string]: any })[prop]);
            return o;
        }, Object.create(Object.getPrototypeOf(source)))
  : source as T;
}

export function dpCopy(oldObj: any) {
  var newObj = oldObj;
  if (oldObj && typeof oldObj === "object") {
      if (oldObj instanceof Date) {
         return new Date(oldObj.getTime());
      }
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
          newObj[i] = dpCopy(oldObj[i]);
      }
  }
  return newObj;
}