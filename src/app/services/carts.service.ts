import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private ApiUrl: string = `${apiServer.serverUrl}/api/carts`

  constructor(private http: HttpClient) { }


  getProductInCartById(cartId:any){
    return this.http.get(`${this.ApiUrl}/${cartId}`)
  }

  addProdTocart(cartId:string, prodId:string, quantity:any ){
    return firstValueFrom (this.http.post(`${this.ApiUrl}/${cartId}/products/${prodId}`, quantity))
  }

  delProductsByIdInCartById(cartId:string, productId:string){
    return this.http.delete(`${this.ApiUrl}/${cartId}/products/${productId}`)
  }

  delProductsInCartById(cartId:string){
    return this.http.delete(`${this.ApiUrl}/${cartId}`)
  }
}
