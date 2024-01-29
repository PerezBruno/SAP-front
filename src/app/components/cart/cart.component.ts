import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartsService } from '../../services/carts.service';
import { jwtDecode } from 'jwt-decode';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{

  products: any

  productSubs: Subscription | undefined

  userLoginOn:boolean = false



  constructor (
    private ticketService: TicketService,
    private cartsService: CartsService,
    private sessionService:SessionService,
    private router:Router){}

  userDataToString = JSON.stringify(jwtDecode(this.sessionService.userToken))
  userJson = JSON.parse(this.userDataToString)
  cartId = this.userJson.user.cart
  emailUser = this.userJson.user.email

  ngOnInit(): void {

    this.sessionService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

    this.productSubs = this.cartsService.getProductInCartById(this.cartId)
    .subscribe({
      next:(products: any)=>{
        // this.products = products.products.docs
        this.products = products.products.products
      },
      error: (err:any) => {
        console.log("🚀 ~ HomeComponent ~ this.productsService.getProducts ~ err:", err)
      },
      complete: ()=>{
        console.log("************ CART completado ***********")
      }
    })
}

ngOnDestroy(): void {
    this.productSubs?.unsubscribe()
}

deleteProduct(productId:string){
  let cartId = this.cartId
  const response = this.cartsService.delProductsByIdInCartById(cartId, productId)
  .subscribe({
    next:((res=>{
      console.log(res, "************************DELETE product")
    }))
  })
  error:()=>{
    console.log(Error);
  }
  }

  delProducts(){
    let cartId = this.cartId
    const response = this.cartsService.delProductsInCartById(cartId)
    .subscribe({
      next:((res=>{
        window.location.reload()
        console.log(res, "************************DELETE product")
      }))
    })
    error:()=>{
      console.log(Error);
    }
  }

  ticket(){
    let cartId = this.cartId
    let email = this.emailUser
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "ml-4 bg-sky-900 hover:bg-sky-950 text-white hover:text-emerald-300 py-2 px-4 rounded",
        cancelButton: "bg-sky-900 hover:bg-sky-950 text-white hover:text-red-300 py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithTailwindButtons.fire({
      title: "¡Deseas confirmar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithTailwindButtons.fire({
          title: "Excelente!",
          text: "Tu compra ha sido confirmada.",
          icon: "success",
        });
        this.ticketService.postBuy(cartId, email)
        this.router.navigate(['/'])
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithTailwindButtons.fire({
          title: "Compra cancelada",
          text: "No te preocupes, tus productos continuaran en el carrito",
          icon: "error"
        });
        this.router.navigate(['/'])
      }
    });

  }
}