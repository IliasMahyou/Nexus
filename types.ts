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

export interface Balance {
    equity: number;
    currentAssets: number;
    shortTermDebts: number;
    totalPassive: number;
    profit: number;
    depositDate: string;
}

export interface Formules {
    liquiditeit: number;
    solvabiliteit: number;
    rentabiliteit: number;
}