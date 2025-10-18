import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService){}
  brandsData:any = ''
  details:any = ''
  showDetails:boolean = false
  ngOnInit(): void {
    this._EcomdataService.getBrands().subscribe({
      next:(responce)=>{
        this.brandsData = responce.data
        console.log(responce.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  getDetails(id:string):void{
    this.showDetails = true
    this._EcomdataService.brandsDetails(id).subscribe({
      next:(responce)=>{
        this.details = responce.data
        console.log(responce.data)
      },
      error:(err)=>[
        console.log(err)
      ]
    })
  }
}
