import { Injectable } from '@angular/core';

import { apiServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product: any

  private ApiUrl: string = `${apiServer.serverUrl}/api/products`

  constructor( private http: HttpClient ) { }

  getProducts(){
    return this.http.get(`${this.ApiUrl}`)
  }

  getProductById(productID:any):Observable<any>{
    return this.http.get(`${this.ApiUrl}/${productID}`)
  }

}
