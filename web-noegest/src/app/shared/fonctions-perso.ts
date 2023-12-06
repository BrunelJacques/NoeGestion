import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";


@Injectable({ providedIn: 'root' })

export class FonctionsPerso{

  isNull(object?: unknown): boolean{
    if (typeof object == 'number'){
      return (object == 0)
    } else {
      return (object === null || object === undefined)
    }
  }
  hoursDelta(date1: Date, date2: Date): number {
    return Math.floor(((date2.getTime()) - (date1.getTime())) / 1000 / 60 / 60)
  }

  deepCopy<T>(source: T): T {
    return Array.isArray(source)
    ? source.map(item => this.deepCopy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
              o[prop] = this.deepCopy((source as { [key: string]: unknown })[prop]);
              return o;
          }, Object.create(Object.getPrototypeOf(source)))
    : source as T;
  }
  dateAnsiToFr(dateString: string| undefined ):string|null {
    if (typeof dateString === 'string') {
      const date = new Date(Date.parse(dateString))
      const datePipe = new DatePipe('fr-FR')
      return datePipe.transform(date,'dd/MM/yyyy')
    } else {
      return null
    }
  }
  division(dividende?:unknown,diviseur?:unknown): number{
    if (typeof diviseur == 'number' 
    && typeof dividende == 'number'
    && diviseur !== 0){
      return diviseur / dividende
    } else {
      return 0
    }
  }
  numToString(nombre:number|undefined,nbDecimales?:number): string {
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof(nombre) === 'number') {
        return nombre.toFixed(nbDecimales)
      } else {return " "}
  }
  round(nombre?:unknown,nbDecimales?:number){
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof nombre == 'number') {
      const puissance10 = Math.pow(10, nbDecimales)
      return Math.round(nombre * puissance10) / puissance10
    } else return nombre
  }
}
