import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createBrandAddFrom();
  }
  createBrandAddFrom() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addbrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'başarılı');
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
        
      );
    }
  }
  get form() {
    return this.brandAddForm.controls;
  }
}
