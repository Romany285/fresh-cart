import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = `https://ecommerce.routemisr.com`
  
  addToWishList(idProduct:string):Observable<any>{
     return this._HttpClient.post(this.baseUrl + `/api/v1/wishlist`,
     {
      productId: idProduct
     }
     )
  }
  getWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/wishlist`)
 }
 removeItem(idProduct:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl + `/api/v1/wishlist/${idProduct}`)
}
}
