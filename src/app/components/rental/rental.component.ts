import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
  dataLoaded = false;
  customers: Customer[] = [];
  carDetails: CarDetails[]=[];
  @Input() carDetail:CarDetails;
  customerId: number;
  rentDate: Date;
  returnDate: Date;

  constructor(private rentalService:RentalService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getRentals();
    this.getCustomer();
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded = true;
    })

  }
  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10);
  }

  addRental() {
    if (this.returnDate < this.rentDate) {
      this.toastrService.error(
        'Kiralama tarihi dönüş tarihinden büyük olamaz.'
      );
    } else {
      let rental: Rental = {
        carId:this.carDetail.carId,
        customerId: parseInt(this.customerId.toString()),
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };
      
      console.log(rental);
      
        
        this.router.navigate(['/payment/', JSON.stringify(rental)]);
        this.toastrService.info('Ödeme Sayfasına Yönlendiriliyorsunuz.');
        
     
      
    }
  }

}
