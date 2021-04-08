import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {
  colorEditForm:FormGroup;
  color:Color;

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createColorEditForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getByBrandId(params['colorId']);
     
      
      }
    });
  }
  createColorEditForm(){
    this.colorEditForm=this.formBuilder.group({
      colorName:["",[Validators.required]]
    })
  }
  getByBrandId(colorId:number){
    this.colorService.getById(colorId).subscribe(response=>
      {
        this.color=response.data;
        this.colorEditForm.patchValue({
          colorName:this.color.colorName
        })
       
      })
  }
  editColor(){
    if(this.colorEditForm.valid){
      let colorModel=Object.assign({},this.colorEditForm.value)
      colorModel.colorId=this.color.colorId
      
      this.colorService.editColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      })
    }
  }

  get form() {
    return this.colorEditForm.controls;
  }

}
