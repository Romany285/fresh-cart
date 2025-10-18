import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   
  baseUrl:string = `https://ecommerce.routemisr.com`
  constructor(private _HttpClient:HttpClient) { }
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  addProductToCart(idProduct:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/api/v1/cart`,{
      productId: idProduct
    }
    )
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/cart`)
  }
  removeItem(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart/${id}`)
  }
  updateItem(id:string , countNum:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `/api/v1/cart/${id}`,
    {
      count:countNum
    } 
    )
  }
  removeCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart`)
  }
  checkOut(cartId:string , orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress: orderInfo
    }
    )
  }
}
