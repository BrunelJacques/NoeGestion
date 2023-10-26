import { DatePipe } from "@angular/common";

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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
            o[prop] = deepCopy((source as { [key: string]: unknown })[prop]);
            return o;
        }, Object.create(Object.getPrototypeOf(source)))
  : source as T;
}

export function DateAnsiToFr(dateString: string| undefined ):string|null {
  if (typeof dateString === 'string') {
    const date = new Date(Date.parse(dateString))
    const datePipe = new DatePipe('fr-FR')
    return datePipe.transform(date,'dd/MM/yyyy')
  } else {
    return null
  }
}


export function IsNull(object?: unknown): boolean{
  if (typeof object == 'number'){
    return (object == 0)
  } else {
    return (object === null || object === undefined)
  }
}

export function Produit(dividende?:unknown,diviseur?:unknown): number{
  if (typeof diviseur == 'number' 
  && typeof dividende == 'number'
  && !IsNull(diviseur)){
    return diviseur / dividende
  } else {
    return 0
  }
}
