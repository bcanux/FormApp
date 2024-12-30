import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'path';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public newFavorite:  FormControl = new FormControl('', [Validators.required]);
  private fb: FormBuilder = new FormBuilder();


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])


  });

  onAddFavorite():void{
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    )
    this.newFavorite.reset();

  }

  onDeleteFavorite(index: number):void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void{
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  getFieldError(field: string):string|null{
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      console.log(key);
      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return 'Hola mundo';
  }

  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

}
