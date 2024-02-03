import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import { Router } from '@angular/router';

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
  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router){

  }


    async register(){
      try {
        this.formSubmitted = true
        if(this.registerForm.invalid){
          return
        }
        const response = await  this.sessionService.postRegister(this.registerForm.value);
        this.router.navigate(['/login'])
      } catch (error) {
        console.log("🚀 ~ RegisterComponent ~ register ~ error:", error)
        
      }
    }
}
