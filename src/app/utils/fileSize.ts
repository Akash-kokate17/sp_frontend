import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileSizeValidator(maxSizeMB: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (file && file instanceof File) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return { fileSize: true };
      }
    }

    return null;
  };
}
