import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  brand:Brand;
  brandEditForm:FormGroup;

  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createBrandEditForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getByBrandId(params['brandId']);
     
      
      }
    });
  }
  createBrandEditForm(){
    this.brandEditForm=this.formBuilder.group({
      brandName:["",[Validators.required]]
    })
  }
  getByBrandId(brandId:number){
    this.brandService.getByBrandId(brandId).subscribe(response=>
      {
        this.brand=response.data;
        this.brandEditForm.patchValue({
          brandName:this.brand.brandName
        })
       
      })
  }
  editBrand(){
    if(this.brandEditForm.valid){
      let brandModel=Object.assign({},this.brandEditForm.value)
      brandModel.brandId=this.brand.brandId
      
      this.brandService.editBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      })
    }
  }

  get form() {
    return this.brandEditForm.controls;
  }







}
