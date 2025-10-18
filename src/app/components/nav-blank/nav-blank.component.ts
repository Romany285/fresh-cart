import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _CartService:CartService,private _WishlistService:WishlistService ,private _Renderer2:Renderer2){}
  @ViewChild('navbar') navelement!:ElementRef
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 0){
      this._Renderer2.addClass(this.navelement.nativeElement,'shadow')
      this._Renderer2.addClass(this.navelement.nativeElement,'bg-white')
    }
    else{
      this._Renderer2.removeClass(this.navelement.nativeElement,'shadow')
      this._Renderer2.removeClass(this.navelement.nativeElement,'bg-white')
    }
  }
  cartCount:number = 0 ;
  wishListCount:number = 0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartCount = data
        console.log(data)
      }
    })
    this._CartService.getUserCart().subscribe({
      next:(responce)=>{
        this._CartService.cartNumber.next(responce.numOfCartItems)
        console.log(responce)
      }
    })

  }
  logOut(){
    this._AuthService.signOut()
  }
}
