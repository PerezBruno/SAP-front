import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit, OnDestroy {

  
  products: any

  productSubs: Subscription | undefined

  constructor (
    private productsService: ProductsService){}

  ngOnInit(): void {
      this.productSubs = this.productsService.getProducts()
      .subscribe({
        next:(products: any)=>{
          this.products = products.products.docs
        },
        error: (err:any) => {
          console.log("🚀 ~ HomeComponent ~ this.productsService.getProducts ~ err:", err)
        },
        complete: ()=>{
          console.log("************ COMPLETADO ***********")
        }
      })
  }

  ngOnDestroy(): void {
      this.productSubs?.unsubscribe()
  }

  updatePage(){
    window.location.reload()
  }
}
