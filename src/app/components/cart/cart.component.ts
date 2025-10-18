import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
// import { UserCart } from 'src/app/interfaces/cart';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartDetails:any  = null
  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(responce)=>{
        this.cartDetails = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  cartOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  remove(id:string,remove:HTMLButtonElement):void{
    this._Renderer2.setAttribute(remove,'disabled','true')
    this._CartService.removeItem(id).subscribe({
      next:(responce)=>{
        this.cartDetails = responce.data
        console.log(responce)
        this._CartService.cartNumber.next(responce.numOfCartItems)
        this._Renderer2.removeAttribute(remove,'disabled')
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changeCount( id:string , count:number ,btn1:HTMLButtonElement,btn2:HTMLButtonElement):void{
    
    if(count >= 1){
      this._Renderer2.setAttribute(btn1,'disabled','true');
      this._Renderer2.setAttribute(btn2,'disabled','true');
      this._CartService.updateItem(id,count ).subscribe({
        next:(responce)=>{
          this.cartDetails = responce.data
          console.log(responce)
          this._Renderer2.removeAttribute(btn1,'disabled');
          this._Renderer2.removeAttribute(btn2,'disabled');
        },
        error:(err)=>{
          console.log(err)
          this._Renderer2.removeAttribute(btn1,'disabled');
          this._Renderer2.removeAttribute(btn2,'disabled');
        }
       });
    }
    
  }
  clear():void{
    this._CartService.removeCart().subscribe({
      next:(responce)=>{
        console.log(responce) 
        if(responce.message == "success"){
          this.cartDetails = null
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
