import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Category } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService){}
  categoryId:string|null  = ''
  categoryDetails:Category = {} as Category
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        
        this.categoryId = params.get('id')
        console.log(params)
      }
    })
    this._EcomdataService.getCategoriesDetails(this.categoryId).subscribe({
      next:(responce)=>{
        this.categoryDetails = responce.data
        console.log(responce)
      }
    })
  }
}
