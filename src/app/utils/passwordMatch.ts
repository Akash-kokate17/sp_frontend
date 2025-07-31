import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function matchPassword(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const passwordControl = group.get(passwordKey);
    const confirmControl = group.get(confirmKey);

    if (!passwordControl || !confirmControl) return null;

    const password = passwordControl.value;
    const confirm = confirmControl.value;

    if (password !== confirm) {
      confirmControl.setErrors({ passwordMismatch: true });
    } else {
      // Remove error if previously set
      if (confirmControl.errors?.['passwordMismatch']) {
        delete confirmControl.errors['passwordMismatch'];
        if (Object.keys(confirmControl.errors).length === 0) {
          confirmControl.setErrors(null);
        }
      }
    }

    return null;
  };
}
