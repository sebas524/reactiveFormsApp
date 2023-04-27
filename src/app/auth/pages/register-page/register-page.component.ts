import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
        [],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidatorService.validate],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cannotBeSebas],
        [],
      ],
      password: ['', [Validators.required, Validators.minLength(4)], []],
      confirmPassword: ['', [Validators.required], []],
    },
    {
      // * here you have access to all fields in the form.
      validators: [
        this.validatorService.fieldOneEqualsFieldTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService
  ) {}

  isFieldValid(field: string) {
    return this.validatorService.isFieldValid(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
