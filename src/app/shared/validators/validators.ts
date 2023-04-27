import { FormControl, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

// * remember that here we are passing in a control, because we are tieing a sspecif input to a control. remmeber: ex: formControlName="username" on html template
export const cannotBeSebas = (
  control: FormControl
): ValidationErrors | null => {
  // * input value:
  const value: string = control.value.trim().toLowerCase();

  if (value === 'sebas') {
    return {
      noSebas: true,
    };
  }

  return null;
};
