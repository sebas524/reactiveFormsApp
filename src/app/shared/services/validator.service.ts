import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  // * remember that here we are passing in a control, because we are tieing a sspecif input to a control. remmeber: ex: formControlName="username" on html template
  public cannotBeSebas = (control: FormControl): ValidationErrors | null => {
    // * input value:
    const value: string = control.value.trim().toLowerCase();

    if (value === 'sebas') {
      return {
        noSebas: true,
      };
    }

    return null;
  };

  public isFieldValid(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public fieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      if (field1Value !== field2Value) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
