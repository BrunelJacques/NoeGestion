import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";

export function validValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    // exemple simple pour test d'un mot tabou, 'ne doit pas contenir'
    if (!ctrl.value.toUpperCase().includes('VALID')) {
      return null;
    } else {
      return {
        validValidator: ctrl.value
      };
    }
  } 
}