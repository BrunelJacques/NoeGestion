import { Injectable } from '@angular/core';

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
  deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj as T;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepCopy(item)) as unknown as T;
    }
    return Object
      .getOwnPropertyNames(obj)
      .reduce((o, prop) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(obj, prop)!);
          o[prop as keyof T] = this.deepCopy((obj as { [key: string]: unknown })[prop]) as T[keyof T];
          return o;
        }, 
      Object.create(Object.getPrototypeOf(obj))
      );
  }
  deepEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    let ret = true
    if (keys1.length !== keys2.length)  ret = false 
    for (const key of keys1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!keys2.includes(key) || !this.deepEqual((obj1 as any)[key], (obj2 as any)[key])) {
        ret = false;
      }
    }
    return ret;
  }
  produit(facteur1: unknown, facteur2: unknown): number{
    const fact1 = typeof facteur1 === "number" ? facteur1 : 1;
    const fact2 = typeof facteur2 == 'number' ? facteur2 : 1; 
    return fact1 * fact2
  }  
  quotient(dividend: unknown, diviser: unknown): number {
    const numDividend: number =
      typeof dividend === "number" 
        ? dividend 
        : (typeof dividend === "string" ? +dividend : 0);
  
    const numDiviser: number =
      typeof diviser === "number" 
        ? diviser 
        : typeof diviser === "string" ? +diviser : 1;
        
    return numDiviser === 0 ? 0 : numDividend / numDiviser; // Avoid division by zero
  }
  numToString(nombre:number|undefined,nbDecimales?:number): string {
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof(nombre) === 'number') {
        return nombre.toFixed(nbDecimales)
      } else {return ""}
  }
  stringToNum(input: string|undefined): number {
    const convertedNumber = Number(input);
    return isNaN(convertedNumber) ? 0 : convertedNumber;
  }
  capitalize(input: string): string {
    return input
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a single string
  }
  round(nombre?:unknown,nbDecimales?:number): number{
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof nombre == 'number') {
      const puissance10 = Math.pow(10, nbDecimales)
      return Math.round(nombre * puissance10) / puissance10
    } else return 0.0
  }
  dateIsoToFr(dateString: string| undefined ):string {
    if (typeof dateString === 'string') {
      const date = new Date(Date.parse(dateString))
      return date.toLocaleDateString("fr-FR")
    } else {return ''}
  }
  dateFrToIso(dateString: string| undefined ):string {
    if (typeof dateString === 'string') {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } else {return ''}
  }
  dateIsoToDate(date: string): Date {
    const dte = new Date(date) 
    return new Date(dte.getFullYear(), dte.getMonth(), dte.getDate());
  }
  dateToIso(date:Date|string):string {
    if (typeof date == 'string') {
      return  new Date(Date.parse(date)).toISOString().slice(0,10);
    }
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
