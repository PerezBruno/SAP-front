import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ApiUrl: string = `${apiServer.serverUrl}/api/carts`

  constructor(private http: HttpClient) { }

  postBuy(cartId:string, email: string){
    return this.http.post(`${this.ApiUrl}/${cartId}/purchase`, email)
  }
}
