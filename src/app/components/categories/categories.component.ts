import { Categories } from './../../interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Category } from 'src/app/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService){}
  CategoriesData:Category[]=[]
  ngOnInit(): void {
    this._EcomdataService.getCategories().subscribe({
      next:(responce)=>{
        this.CategoriesData = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
