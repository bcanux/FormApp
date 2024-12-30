import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { cantBeStrider } from '../../../shared/validators/validators';
// import * as customValidatos from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/Service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent  {
  //private fb: FormBuilder = new FormBuilder();
  //private validatorService: ValidatorsService = new  ValidatorsService();

  //public myForm: FormGroup = new FormGroup({});

  // Inyección de dependencias.
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);
  private emailValidatorService = inject(EmailValidatorService);


  public myForm: FormGroup  = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    // email: ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern) ],[new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern) ],[this.emailValidatorService]],
    username:  ['', [Validators.required, this.validatorService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, ]],
  },{
    validators: [
      this.validatorService.isFieldOneEqualsFieldTwo('password', 'password2')
    ]
  });

  // constructor(
  //   private validatorService: ValidatorsService,
  //   private emailValidatorService: EmailValidatorService,

  // ){


  // }

   //= new ValidatorsService();
  isValidField(field: string){
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit (){
    this.myForm.markAllAsTouched();

  }
}
