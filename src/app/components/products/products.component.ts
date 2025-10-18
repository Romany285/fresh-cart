import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { product } from 'src/app/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _Renderer2:Renderer2,private _ToastrService:ToastrService){}
  products:product[] = [] ;
  pageSize:number = 0 ;
  currentPage:number = 1 ;
  total:number = 0 ;
  ngOnInit(): void {
    this._EcomdataService.getProducts().subscribe({
      next:(responce)=>{
        this.pageSize = responce.metadata.limit
        this.currentPage = responce.metadata.currentPage
        this.total = responce.results
        this.products = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addProduct(id:string,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addProductToCart(id).subscribe({
      next:(responce)=>{
        this._CartService.cartNumber.next(responce.numOfCartItems)
        console.log(responce)
        this._ToastrService.success(responce.message)
        this._Renderer2.removeAttribute(element,'disabled')
      },
      error:(err)=>{
        console.log(err)
      }
    });
  };
  pageChanged(event:any):void{
    this._EcomdataService.getProducts(event).subscribe({
      next:(responce)=>{
        this.pageSize = responce.metadata.limit
        this.currentPage = responce.metadata.currentPage
        this.total = responce.results
        this.products = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  };
}
 