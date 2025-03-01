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
  produit(facteur1: unknown, facteur2: unknown): number{
    const fact1 = typeof facteur1 === "number" ? facteur1 : 1;
    const fact2 = typeof facteur2 == 'number' ? facteur2 : 1; 
    return fact1 * fact2
  }  
  quotient(dividende:unknown, diviseur:unknown): number{
    const div1 = typeof dividende == 'number' ? dividende : 1
    const div2 = (typeof diviseur == 'number' && diviseur != 0) ? diviseur : 1
    return div1 / div2
  }
  numToString(nombre:number|undefined,nbDecimales?:number): string {
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof(nombre) === 'number') {
        return nombre.toFixed(nbDecimales)
      } else {return " "}
  }
  stringToNum(input: string|undefined): number {
    const convertedNumber = Number(input);
    return isNaN(convertedNumber) ? 0 : convertedNumber;
  }
  round(nombre?:unknown,nbDecimales?:number): number{
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof nombre == 'number') {
      const puissance10 = Math.pow(10, nbDecimales)
      return Math.round(nombre * puissance10) / puissance10
    } else return 0
  }
  dateIsoToFr(dateString: string| undefined ):string|null {
    if (typeof dateString === 'string') {
      const date = new Date(Date.parse(dateString))
      return date.toLocaleDateString("fr-FR")
      //const datePipe = new DatePipe('fr-FR')
      //return datePipe.transform(date,'dd/MM/yyyy')
    } else {
      return null
    }
  }
  dateIsoToDate(date: string): Date {
    const dte = new Date(date) 
    return new Date(dte.getFullYear(), dte.getMonth(), dte.getDate());
  }
  dateToIso(date:Date):string {
      return date.toISOString()
  }
  compareDates(date1: Date, date2: Date): boolean {
    const dt2 = date2
    const dt1 = date1
    return dt1.getFullYear() === dt2.getFullYear() &&
           dt1.getMonth() === dt2.getMonth() &&
           dt1.getDate() === dt2.getDate();
  }
}
