import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userLoginOn:boolean = false
  decodedToken:any
  token: any 

  constructor(private sessionService:SessionService, private router: Router){
    this.sessionService.userLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    })
    this.sessionService.userData.subscribe({
      next:(userData) =>{
        this.token = jwtDecode(userData)
      }
    })
  }

  ngOninit():void {
    this.sessionService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

  }
  
  logout(){
    this.sessionService.getLogout();
    this.router.navigate(['/'])
  }
}

