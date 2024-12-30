import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {


  // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({email});

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   );
  // }


  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObaservable = new Observable<ValidationErrors|null>( (subscriber)=> {
      console.log({email});
      if (email === 'brandoncanux@gmail.com'){
        subscriber.next({emailTaken: true});
        subscriber.complete();
        //return;
      }
      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000)
    );

    return httpCallObaservable;
//Ejemplo por si se necesitara llamar a un servicio para validar el correo.
  //   return this.http.get<any[]>(`http://localhost:300/users?q=${email}`)
  //   .pipe(
  //     map(resp => {
  //       return(resp.length === 0)
  //       ?null
  //       :{emailTaken:  true}
  //     })
  //   );
 }


}
