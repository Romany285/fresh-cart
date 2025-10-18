import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [ 
  {path:'',loadComponent:()=>import('./components/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:'Cart'},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:'Product'},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),title:'Brands'},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),title:'Categories'},
    {path:'wishList',loadComponent:()=>import('./components/withlist/withlist.component').then((m)=>m.WithlistComponent),title:'Withlist'},
    {path:'details/:id',loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent),title:'Details'},
    {path:'payment/:id',loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:'Payment'},
    {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent)},
    {path:'forget',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent),title:'Forget Password'},
    {path:'categorydetails/:id',loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent),title:'Category Details'}
     
  ],
  canActivate:[authGuard]
},
{path:'',loadComponent:()=>import('./components/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
children:[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'register'},
  {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'login'},
  {path:'forgetpassword',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent),title:'Forget Password'}
]
},
{path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
