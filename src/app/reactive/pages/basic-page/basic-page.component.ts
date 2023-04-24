import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const iphone18 = {
  name: 'iphone 18',
  price: 4200,
  inStock: 11,
};

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  // * ugly syntax:
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormGroup('', [], []),
  //   price: new FormGroup('', [], []),
  //   inStock: new FormGroup('', [], []),
  // });
  // * better looking syntax:
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStock: [0, [Validators.required, Validators.min(0)], []],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset(iphone18);
  }

  isFieldValid(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key);
      switch (key) {
        case 'required':
          return 'this field is required';
        case 'minlength':
          return `minimum of ${errors['minlength'].requiredLength} characters.`;
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      // * this is to trigger all validations:
      this.myForm.markAllAsTouched();
      return;
    }
    console.log('saved => ', this.myForm.value);
    // * if reset is left empty then it resets every property.or you can set predetermied values wiht {}:
    this.myForm.reset({ price: 10, inStock: 0 });
  }
}
