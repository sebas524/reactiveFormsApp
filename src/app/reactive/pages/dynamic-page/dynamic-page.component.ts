import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    favorites: this.formBuilder.array([
      ['zelda', Validators.required],
      ['mario kart', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder) {}

  get favorites() {
    return this.myForm.get('favorites') as FormArray;
  }
  isFieldValid(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  isFieldValidInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
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

  onAdd(): void {
    if (this.newFavorite.invalid) {
      return;
    }

    this.favorites.push(
      this.formBuilder.control(this.newFavorite.value, Validators.required)
    );

    this.newFavorite.reset();
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favorites'] as FormArray) = this.formBuilder.array(
      []
    );
    this.myForm.reset();
  }

  onDelete(index: number): void {
    // * since you already have a getter that returns favorites, then why not just use it. AND since in js everything passes thorugh reference, then a modification directly at favorites will delete directly the item in the array
    this.favorites.removeAt(index);
  }
}
