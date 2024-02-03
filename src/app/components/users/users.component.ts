import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy{

  users: any

  usersSubs: Subscription | undefined

  userLoginOn:boolean = false



  constructor (
    private sessionService:SessionService,
    private usersService: UsersService,
    private router:Router){}

  ngOnInit(): void {

    this.sessionService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

    this.usersSubs = this.usersService.getUsers()
    .subscribe({
      next:(users: any)=>{
        // this.products = products.products.docs
        this.users = users.users
      },
      error: (err:any) => {
        console.log("🚀 ~ HomeComponent ~ this.productsService.getProducts ~ err:", err)
      },
      complete: ()=>{
      }
    })
}

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe()
}

  deleteUser(userId:string){
  try {
    const response = this.usersService.deleteUserById(userId)
    .subscribe({
      next:((res=>{
        window.location.reload()
      }))
    })
    error:()=>{
      console.log(Error);
    }
  } catch (error) {
    console.log("🚀 ~ UsersComponent ~ deleteUser ~ error:", error)
    
  }
}

  deleteAllUsers(){
    try {
      const swalWithTailwindButtons = Swal.mixin({
        customClass: {
          confirmButton: "ml-4 bg-sky-900 hover:bg-sky-950 text-white hover:text-emerald-300 py-2 px-4 rounded",
          cancelButton: "bg-sky-900 hover:bg-sky-950 text-white hover:text-red-300 py-2 px-4 rounded"
        },
        buttonsStyling: false
      });
      swalWithTailwindButtons.fire({
        title: "¿Desea eliminar a todos los usuarios?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithTailwindButtons.fire({
            text: "Los usuarios han sido eliminados satisfactoriamente",
            icon: "success",
          });
          const response = this.usersService.deleteUsers()
          .subscribe({
            next:((res=>{
              window.location.reload()
            }))
          })
          error:()=>{
            console.log(Error);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithTailwindButtons.fire({
            title: "Accion cancelada",
          });
        }
      });

    } catch (error) {
      console.log("🚀 ~ UsersComponent ~ deleteUser ~ error:", error)
      
    }
}




deleteOfflineUsers(){
  try {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "ml-4 bg-sky-900 hover:bg-sky-950 text-white hover:text-emerald-300 py-2 px-4 rounded",
        cancelButton: "bg-sky-900 hover:bg-sky-950 text-white hover:text-red-300 py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithTailwindButtons.fire({
      title: "¿Desea eliminar los usuarios inactivos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithTailwindButtons.fire({
          text: "Los usuarios han sido eliminados satisfactoriamente",
          icon: "success",
        });
        const response = this.usersService.inactiveUsersDelete()
        .subscribe({
          next:((res=>{
          }))
        })
        window.location.reload()
        error:()=>{
          console.log(Error);
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithTailwindButtons.fire({
          title: "Accion cancelada",
        });
      }
    });
  
  } catch (error) {
    console.log("🚀 ~ UsersComponent ~ deleteUser ~ error:", error)
    
  }
}


}

