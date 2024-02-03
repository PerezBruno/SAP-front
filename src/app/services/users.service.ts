import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private ApiUrl: string = `${apiServer.serverUrl}/api/users`

  constructor( private http: HttpClient ) { }

  getUsers(){
    return this.http.get(`${this.ApiUrl}`)
  }

  deleteUserById(userId:string){
    return this.http.delete(`${this.ApiUrl}/${userId}`)
  }

  deleteUsers(){
    return this.http.delete(`${this.ApiUrl}/all`)
  }

  inactiveUsersDelete(){
    return this.http.delete(`${this.ApiUrl}`)
  }
}
