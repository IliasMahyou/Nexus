import { ObjectId } from "mongodb";

export interface Company{
    _id?:ObjectId,
    name:string,
    referencenumber:string,
    address:string,
    depositDate: string,
    equities:number,
    debts:number,
    profit:number,
}

export interface User{
    name:string,
    password:string,
}

export interface History{
    _id?:ObjectId,
    username:string,
    referencenumber:string,
}

export interface fetchOptions {
    method: string;
    headers: {
      "NBB-CBSO-Subscription-Key": string;
      "X-Request-Id": string;
      Accept: string;
    };
    timeout: number;
}

export interface Balans {
    eigenVermogen: number;
    vreemdVermogen: number;
    vlottendeActiva: number;
    korteTermijnSchulden: number;
    totaalPassief: number;
}