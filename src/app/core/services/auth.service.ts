import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/auth/`
  userData:any
  constructor(private _HttpClient:HttpClient ,private _Router:Router) { }
  setRegister(userData:object):Observable<any>{
     return this._HttpClient.post(this.baseUrl+`signup`,userData)
  }
  setLogin(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`signin`,userData)
 }
 decodeUser():void{
   if(localStorage.getItem('etoken') != null){
    const encodeToken:any = localStorage.getItem('etoken')
    const decodeToken = jwtDecode(encodeToken)
    this.userData = decodeToken
    console.log(decodeToken)
   }
 }
 signOut():void{
  localStorage.removeItem('etoken')
   this._Router.navigate(['/login'])
 }
}
