import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formSubmitted: boolean = false;

  loginForm: any = this.fb.group({
    email:["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(3)]]
  })

  session: any

  constructor( private fb: FormBuilder , private sessionService: SessionService, private router:Router){

  }


    login(){
      if(this.loginForm.valid){

        this.sessionService.postLogin(this.loginForm.value).subscribe({
          next: (userData) => {
            this.router.navigate(['/'])
          },
          error:(errorData)=>console.log(errorData, "ERROR Data login")
        })
      }
      // const email = this.loginForm.value.email;
      // const password = this.loginForm.value.password;

      // const result = this.sessionService.postLogin({email, password})
      // console.log("🚀 ~ LoginComponent ~ login ~ result:", result.)
  }
}