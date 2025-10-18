import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _FormBuilder:FormBuilder , private _CartService:CartService){}
  cartId:any ;
  orderForm:FormGroup =this._FormBuilder.group({
    details:['',[Validators.required,Validators.minLength(3)]],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',Validators.required]
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id')
        
        console.log(this.cartId)
      }
    })
  }
  handleForm():void{
    if(this.orderForm.valid){
      this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
        next:(responce)=>{
          if(responce.status == 'success'){
            window.open(responce.session.url , '_self')
          }
          console.log(responce)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    
  }
}
