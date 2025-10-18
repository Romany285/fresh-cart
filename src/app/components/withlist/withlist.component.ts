import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { product } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-withlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './withlist.component.html',
  styleUrls: ['./withlist.component.scss']
})
export class WithlistComponent implements OnInit{
  constructor(private _WishlistService:WishlistService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _CartService:CartService){}
  products:product [] = []
  wishListData:string[]=[]
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(responce)=>{
        this.products = responce.data
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
        const newProductsData = this.products.filter((item:any)=>this.wishListData.includes(item._id))
        this.products = newProductsData
        console.log(newProductsData)
        // this._WishlistService.wishListCount.next(responce.count)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
