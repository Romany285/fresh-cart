import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NodeWithI18n } from '@angular/compiler';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errMsg:string = '';
  isLoading:boolean = false
  showPassword: boolean = false;
showRePassword: boolean = false;
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService , private _Router:Router){}
  registerForm:FormGroup = this._FormBuilder.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[''],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },
  {validators:[this.confirmPassword] } as FormControlOptions
  )
  confirmPassword(group:FormGroup){
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if(rePassword?.value == ''){
      rePassword.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }
   handleForm() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const userData = this.registerForm.value;

  this.isLoading = true;

  this._AuthService.setRegister(userData).subscribe({
    next: (response) => {
      if (response.message === 'success') {
        this.isLoading = false;
        this._Router.navigate(['/login']);
      }
    },
    error: (err) => {
      this.errMsg = err.error.message;
      this.isLoading = false;
      console.log(err);
    }
  });
}
togglePassword(): void {
  this.showPassword = !this.showPassword;
}

toggleRePassword(): void {
  this.showRePassword = !this.showRePassword;
}
}
