 import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { product } from 'src/app/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Categories } from 'src/app/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products:product[] = [];
  categories:Categories[] = [];
  term:string = '' ;
  wishListData:string[]=[];
  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._EcomdataService.getProducts().subscribe({
      next:(responce)=>{
        
        this.products = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this._EcomdataService.getCategories().subscribe({
      next:(responce)=>{
        this.categories = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(responce)=>{
        console.log(responce)
        const newData = responce.data.map((item:any)=>item._id)
        console.log(newData)
        this.wishListData = newData
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  categoriesOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayTimeout:4000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    autoplaySpeed:1500,
    autoplayTimeout:1000,
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
  addWishList(id:string){
    this._WishlistService.addToWishList(id).subscribe({
      next:(responce)=>{
        this.wishListData = responce.data
        this._ToastrService.success(responce.message)
        console.log(responce)
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  removeFav(id:string):void{
    this._WishlistService.removeItem(id).subscribe({
      next:(responce)=>{
        this.wishListData = responce.data
        this._ToastrService.success(responce.message)
        console.log(responce)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
