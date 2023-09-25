import { AbstractControl, ValidationErrors } from '@angular/forms';
export function touchedValidator(control: AbstractControl): ValidationErrors | null {
    if (control.touched) {
      return null; // Control is valid if touched
    }
    return null // Control is invalid if not touched
  }