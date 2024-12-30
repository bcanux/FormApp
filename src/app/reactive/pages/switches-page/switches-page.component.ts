import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  private fb :FormBuilder = new FormBuilder();

  public myForm:  FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications:  [true, Validators.required],
    termsAndConditiosns: [false, Validators.requiredTrue]
  });

  onSubmit(){
    if(this.myForm.invalid){
      console.log(this.myForm.value);
      this.myForm.markAllAsTouched();
      return;
    }
  }


  // getFieldError(field: string):string|null{
  //   if (!this.myForm.controls[field]) return null;
  //   const errors = this.myForm.controls[field].errors || {};

  //   for(const key of Object.keys(errors)){
  //     console.log(key);
  //     switch(key){
  //       case 'required':
  //         return 'Este campo es requerido';

  //       case 'minlength':
  //           return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
  //     }
  //   }

  //   return 'Hola mundo';
  // }

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }
  // isValidFieldInArray(formArray: FormArray, index: number){
  //   return formArray.controls[index].errors
  //   && formArray.controls[index].touched;
  // }

}
