import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cardetails: CarDetails[] = [];
  dataLoaded = false;
  constructor(private carDetailService: CarDetailService) {}

  ngOnInit(): void {
    this.getCarDetails();
  }
  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }
}
