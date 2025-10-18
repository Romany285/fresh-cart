import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetpassService } from 'src/app/core/services/forgetpass.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(private _FormBuilder: FormBuilder,private _ForgetpassService:ForgetpassService,private _Router:Router) {}
  step1:Boolean = true ;
  step2:Boolean = false ;
  step3:Boolean = false ;
  email:string = '';
  userMsg:string = ''
  forgetForm:FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    
  });
  resetForm:FormGroup = this._FormBuilder.group({
    reset: ['',Validators.required],
    
  });
  newPassForm:FormGroup = this._FormBuilder.group({
    password: ['', [Validators.required,Validators.pattern(/^\w{6,}$/)]],
    
  });
  forgetPassword():void {
    
    let userEmail = this.forgetForm.value
    this.email = userEmail.email
    this._ForgetpassService.forgetPassword(userEmail).subscribe({
      next:(responce)=>{
         console.log(responce)
         this.userMsg = responce.message
         this.step1 = false
         this.step2 = true
      },
      error:(err)=>{
        this.userMsg= err.error.message
        console.log(err)
      }
    })
  }
  resetCode():void{
    console.log(this.resetForm.value)
    let resetCode = this.resetForm.value
     this._ForgetpassService.resetCode(resetCode).subscribe({
      next:(responce)=>{
        this.userMsg = responce.status
        this.step2 = false
        this.step3 = true
        console.log(responce)
      },
      error:(err)=>{
        this.userMsg = err.error.message
        console.log(err)
      }
     })
  }
  newPassword():void{
    let resetForm = this.resetForm.value
    resetForm.email = this.email
    this._ForgetpassService.resetPassword(resetForm).subscribe({
      next:(responce)=>{
        if(responce.token){
          localStorage.setItem('etoken',responce.token)
          this._Router.navigate(['/home'])
        }
        console.log(responce)
      },
      error:(err)=>{
        this.userMsg = err.error.message
        console.log(err)
      }
    })
  }
}
