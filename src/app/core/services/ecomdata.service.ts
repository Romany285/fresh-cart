import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {
  baseUrl:string = `https://ecommerce.routemisr.com`
  constructor(private _HttpClient:HttpClient) { }
  getProducts(numPage:number = 1):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/products?page=${numPage}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/categories`)
  }
  getDetails(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/products/${id}`)
  }
  getCategoriesDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/categories/${id}`)
  }
  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/brands`)
  }
  brandsDetails(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/brands/${id}`)
  }
}
