import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { SessionService } from '../../services/session.service';
import { jwtDecode } from 'jwt-decode';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent implements OnInit, OnDestroy{

  selectOptions: any 

  selectQuantity: string = "0"
  
  selection: string = ""

  _id:string | undefined;

  product: any;

  productSubs : Subscription | undefined;

  currentImg: string | undefined;

  gallery : Array<any> = [];

  renderGallery: boolean = true

  userLoginOn:boolean = false

  constructor (
    private route: ActivatedRoute,
    private productService: ProductsService,
    private sessionService:SessionService,
    private cartsService: CartsService,
    private router:Router) {

    this.selectOptions = [0,1,2,3,4,5,6,7,8,9]

  }

  ngOnInit(): void {
    this.sessionService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

    this._id = this.route.snapshot.params['id']

    this.productSubs = this.productService.getProductById(this._id)
    .subscribe({
      next: (product: any)=>{
        this.product = product.product
        this.currentImg = this.product.thumbnail[0]
        
      },
      error: (err:any) => {
        console.log("🚀 ~ HomeComponent ~ this.productsService.getProducts ~ err:", err)
      }
    }) 
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe()
  }

  handleChangeImg(itemImg: string){
    this.currentImg = itemImg;
  }

  catchQuantity(){
    this.selection = this.selectQuantity  /// esta funcion me trae la cantidad desde el HTML
    return {quantity: this.selectQuantity}
  }
   async postAddToCart(){
    let prodId = this.product._id  // Me da el Id del producto
    let userDataToString = JSON.stringify(jwtDecode(this.sessionService.userToken))
    let userJson = JSON.parse(userDataToString)
    let cartId = userJson.user.cart   /// me da el id del carritpo
    let cuantity = this.catchQuantity()  /// esta es el quntity => que viene de la funcion de arriba

    const response = await this.cartsService.addProdTocart(cartId, prodId, cuantity)  /// envío los datos mediante un servicio al metodo addProdToCart()
    this.router.navigate(['/cart'])
  }

  sendToLogin(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Aún no has iniciado sesión!",
      showConfirmButton: false,
      footer: '<a href="/login">Has <span class="text-xl">click aquí!</span> para iniciar sesión</a>'
    });
  }
}
