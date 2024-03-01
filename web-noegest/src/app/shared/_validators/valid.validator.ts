import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";

export function tabooValidator(taboo:string|null): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null || ctrl.value.length === 0 ) {
      return null
    }
    // exemple simple pour test d'un mot tabou, 'ne doit pas contenir'
    if (!ctrl.value.toUpperCase().includes(taboo?.toUpperCase())) {
        // valide
        return null;
    } else {
      //invalide
      return { tabooValidator: ctrl.value } ;
    }
  } 
}

export function passwordValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null) {
      return {passwordValidator: ctrl.value}
    }
    const hasNumber = /\d/.test(ctrl.value);
    const hasUpper = /[A-Z]/.test(ctrl.value);
    const hasLower = /[a-z]/.test(ctrl.value);
    const isLong = ctrl.value.length > 5;
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower && isLong;
    if (valid) {
      return null;
    } else {
      return { passwordValidator: "6 caractéres nécessaires, dont majuscule, minuscule et chiffre" };
    }
  } 
}
