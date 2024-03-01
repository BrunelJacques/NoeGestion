import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main:string, confirm:string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalide control names'
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const mainValue = ctrl.get(main)!.value;    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const confirmValue = ctrl.get(confirm)!.value;
    return mainValue === confirmValue ? null: {
      confirmEqual: {
        main: mainValue,
        confirm: confirmValue
      }
    }
  }
}