import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Rental } from 'src/app/models/rental';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { AccountService } from 'src/app/services/account.service';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Card } from 'src/app/models/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  accountForm: FormGroup;
  rental: Rental;
  customer: Customer;
  carDetail: CarDetails;
  customerId: number;
  account: Account[]=[];
  card: Account;
  amountOfPayment: number = 0;
  accountNumber: bigint;
  month: number;
  year: number;
  name: string;
  cvv: number;
  balance: number;
  accountId: number;
  

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private carDetailsService: CarDetailsService,
    private accountService: AccountService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.customerId = JSON.parse(params['rental']).customerId;
        this.getAccountDetailById();
        this.getCarsDetailsById();
      }
    });
  }
  
  getCarsDetailsById() {
    this.carDetailsService
      .getCarDetailsById(this.rental.carId)
      .subscribe((response) => {
        this.carDetail = response.data[0];
        this.paymentCalculator();
      });
  }
  
    
  
  getAccountDetailById() {
    this.accountService
      .getAccountById(this.rental.customerId)
      .subscribe((response) => {
        this.card = response.data[0];
      });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var returnDate = new Date(this.rental.returnDate.toString());
      var rentDate = new Date(this.rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetail.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz.',
          'Hatalı işlem'
        );
      }
    }
  }

  payRental() {
    let account: Account = {
      accountId: this.card.accountId,
      accountNumber: this.accountNumber,
      month: this.month,
      year: this.year,
      name: this.name,
      cvv: this.cvv,
      balance: this.card.balance,
      customerId: this.rental.customerId,
    };
   
    if(this.card.month===this.month &&this.card.year === this.year&&this.card.accountNumber===this.accountNumber&&
      this.card.cvv===this.cvv&&this.card.name===this.name){
      if (this.card.balance >= this.amountOfPayment) {
        this.card.balance = this.card.balance - this.amountOfPayment;
        account.balance = this.card.balance;
  
        console.log(this.card.balance);
        this.accountService.updateAccount(account).subscribe((response) => {
          this.rentalService.addRental(this.rental).subscribe((res) => {
            this.toastrService.success(response.message, 'başarılı');
            this.toastrService.success(res.message, 'başarılı');
          });
        });
  
        console.log(this.rental);
      } else {
        console.log(this.card.balance);
        this.toastrService.error(
          'Kartınızda yeterli bakiye bulunmamaktadır.',
          'Hata'
        );
      }

    }
    else{
      console.log("bilgiler onaylanmdaı.")
    }
    
      

    
    
     

    
    

    
  }
}
