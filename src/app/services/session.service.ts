import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private ApiUrl: string = `${apiServer.serverUrl}/api/session`

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("")


  constructor( private http: HttpClient ) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("cookieToken")!=null)
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("cookieToken") || "")
  }

  postLogin(credentials: any):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}/login`, credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("cookieToken", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true)
      }),
        map((userData)=>{
          userData.token})
          
    )
  }


  getLogout():void{
    sessionStorage.removeItem("cookieToken");
    this.http.get<any>(`${this.ApiUrl}/logout`)
    this.currentUserLoginOn.next(true)

  }

  postRegister(newUser:any){
    return firstValueFrom(
      this.http.post(`${this.ApiUrl}/register`, newUser)
    )
  }

  get userData():Observable<string>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():string{
    return this.currentUserData.value;
  }
}
