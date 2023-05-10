import { ObjectId } from "mongodb";

export interface Company{
    _id?:ObjectId,
    name:string,
    referencenumber:string,
    address:string,
    equities:number,
    debts:number,
    profit:number,
}


export interface User{
    name:string,
    password:string,
}

export interface History{
    username:string,
    referencenumber:string,
}