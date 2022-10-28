// Angular modules
import { Injectable }       from '@angular/core';
import { AbstractControl }  from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn : 'root'
})
export class ParamsValidator

{  constructor() {}

  public static campValidator(control : AbstractControl) : ValidationErrors | null
  {
    // Recherche nécessité de saisie
    const origine = control.get('origine').value
    if (origine != 'camp')
      return null;
    const camp = control.get('camp').value;
    if (camp == '') 
      return { invalidParams : true };

    return null;
  }
}