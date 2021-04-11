export interface Account{
    accountId:number;
    userId:number;
    customerId?:number;
    balance:number;
    month:number;
    year:number;
    name:string;
    cvv:number;
    accountNumber:bigint;       
}