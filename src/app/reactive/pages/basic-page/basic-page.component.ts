import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });
  private fb:  FormBuilder = new FormBuilder();

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: [0, [Validators.required, Validators.min(0)]],
    inSotrage: [0, [Validators.required, Validators.min(0)]],
  })

  ngOnInit(): void {
    this.myForm.reset({price:0, inSotrage: 0});
  }
  //constructor(private fb: FormBuilder){}
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

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  onSave():void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return

    };
    console.log(this.myForm.value);

    this.myForm.reset({price:0, inSrorage: 0});

  }

}
