import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required], []],
    email: ['', [Validators.required], []],
    username: ['', [Validators.required], []],
    password: ['', [Validators.required, Validators.minLength(4)], []],
    confirmPassword: ['', [Validators.required], []],
  });

  constructor(private fb: FormBuilder) {}

  isFieldValid(field: string) {
    //TODO: get validation from special server
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
