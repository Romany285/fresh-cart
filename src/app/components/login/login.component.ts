import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading:boolean = false
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  loginForm:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  handleForm(){
    const userData = this.loginForm.value
    this.isLoading = true
    if(this.loginForm.valid){
       this._AuthService.setLogin(userData).subscribe({
        next:(responce)=>{
         
          if(responce.message == 'success'){
            localStorage.setItem('etoken',responce.token);
            this._AuthService.decodeUser();
            this._Router.navigate(['/home']);
            this.isLoading = false;
            
          }
          console.log(responce)
        },
        error:(err)=>{
          this.isLoading = false
          console.log(err)
        }
       })
    }
  }
}
