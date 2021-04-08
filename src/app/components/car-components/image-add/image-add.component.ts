import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageAddForm:FormGroup;
  selectedFile:File;
  carDetails:CarDetails[];

  constructor(private formBuilder:FormBuilder,
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.createImageAddForm();
    this.getCars();

  }
  createImageAddForm(){
    this.imageAddForm=this.formBuilder.group({     
      carId:["",[Validators.required]],
    })
  }
  addImage(){
    if (this.imageAddForm.valid) {
      let imageModel = Object.assign({}, this.imageAddForm.value);
     
      this.carImageService.addImage(imageModel,this.selectedFile).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
      )}
  }
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]
  }

  getCars(){
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data
      
    })

  }




}
