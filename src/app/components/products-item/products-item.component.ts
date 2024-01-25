import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrl: './products-item.component.css'
})
export class ProductsItemComponent implements OnInit {



  constructor(){

  }

  @Input() product: any |undefined;

  ngOnInit(): void {

    
  }
}
