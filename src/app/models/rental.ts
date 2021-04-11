export interface Rental{
    rentalId?:number;
    carId:number;
    brandName?:string;
    firstName?:string;
    lastName?:string;
    customerId?:number;
    rentDate:Date;
    returnDate:Date;
}