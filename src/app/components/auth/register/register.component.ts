import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  registerForm: any = this.fb.group({
    first_name:["", [Validators.required]],
    last_name: ["", [Validators.required]],
    email:["", [Validators.required]],
    age:["", [Validators.required]],
    password:["", [Validators.required,  Validators.minLength(3)]],
  })
  constructor( private fb: FormBuilder, private sessionService: SessionService){

  }


    async register(){
      this.formSubmitted = true
      if(this.registerForm.invalid){
        return
      }
      console.log("*******************", this.registerForm.value)
      const response = await  this.sessionService.postRegister(this.registerForm.value);
      console.log("🚀 ~ RegisterComponent ~ register ~ response:", response)
      
    }
}
