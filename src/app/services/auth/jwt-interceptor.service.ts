import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor( private sessionService:SessionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String = this.sessionService.userToken

      console.log("🚀 ~ JwtInterceptorService ~ intercept ~ this.sessionService:", this.sessionService.currentUserData.value)
      const reqClone = req.clone({
        setHeaders:{
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json",
          "Authorization": `${token}`,
        },
      })

    return next.handle(reqClone).pipe(
            catchError((error)=>{
        console.log(error, "error en interceptor JWT")
        return throwError(() => error)
      })
    )
  }
}
