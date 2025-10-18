import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService,private _ActivatedRoute:ActivatedRoute , private _CartService:CartService,private _Renderer2:Renderer2,private _ToastrService:ToastrService){}
  productDetails:any = null ;
  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
     
    next:(params)=>{
      let idProduct:any = params.get('id')
      this._EcomdataService.getDetails(idProduct).subscribe({
        next:(responce)=>{
          console.log(responce.data)
          this.productDetails = responce.data
        },
        error:(err)=>{
          console.log(err)
        }
       })
      console.log(idProduct)
    }
     
   })
    
  } 
  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
     items:1,
    nav: false
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
    })
  }
}
