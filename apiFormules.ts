import fetch from "node-fetch";
import { Balance, fetchOptions, Formules } from "./types";
import { liquiditeit, rentabiliteit, solvabiliteit } from "./formules";

const apiKey: string = "5bca88bca6c74941af1a74c459833c52";
const requestId: string = "4b8e79a0-bd54-11eb-8529-0242ac130003";
let accountingDataUrl: string = "";
let formules: Formules;
/*functions*/
async function getFetch(enterprisenumber:string):Promise<any> {
    const url = `https://ws.cbso.nbb.be/authentic/legalEntity/${enterprisenumber}/references`;
    const fetchOptions:fetchOptions = {
      method: "GET",
      headers: {
        "NBB-CBSO-Subscription-Key": apiKey,
        "X-Request-Id": requestId,
        Accept: "application/json",
      },
      timeout: 12000,
    };
      return await fetch(url, fetchOptions)
  }
  
  async function firstApiCall(enterprisenumber:string,balance: Balance):Promise<string>{
    let response = await getFetch(`${enterprisenumber}`);
    let responseData = await response.json();
    let bool = false;
    do { 
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].ExerciseDates.startDate >= "2022-01-01") {
          accountingDataUrl = responseData[i].AccountingDataURL;
          balance.depositDate = responseData[i].DepositDate;
          bool = true;
        }
      }
      if (bool == false) {
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].ExerciseDates.startDate >= "2021-01-01") {
            accountingDataUrl = responseData[i].AccountingDataURL;
            balance.depositDate = responseData[i].DepositDate;
            bool = true;
          }
        }
      }
      if (bool == false) {
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].ExerciseDates.startDate >= "2020-01-01") {
            accountingDataUrl = responseData[i].AccountingDataURL;
            balance.depositDate = responseData[i].DepositDate;
            bool = true;
          }
        }
      }
      if (bool == false) {
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].ExerciseDates.startDate >= "2019-01-01") {
            accountingDataUrl = responseData[i].AccountingDataURL;
            balance.depositDate = responseData[i].DepositDate;
            bool = true;
          }
        }
      }
    } while (bool == false);
    return accountingDataUrl;
}

async function secondApiCall(accountingDataUrl:string,balance: Balance):Promise<any> {
    const fetchOptions:fetchOptions = {
      method: "GET",
      headers: {
        "NBB-CBSO-Subscription-Key": apiKey,
        "X-Request-Id": requestId,
        Accept: "application/x.jsonxbrl",
      },
      timeout: 12000,
    };
    let response = await fetch(accountingDataUrl, fetchOptions);
    let data = await response.json();
    for(let i = 0; i < data.Rubrics.length; i++){
        if (data.Rubrics[i].Code == "10/15" && data.Rubrics[i].Period == "N") {
            balance.equity = data.Rubrics[i].Value;
        }
        if (data.Rubrics[i].Code == "29/58" && data.Rubrics[i].Period == "N") {
            balance.currentAssets = data.Rubrics[i].Value;
        }
        if (data.Rubrics[i].Code == "42/48" && data.Rubrics[i].Period == "N") {
            balance.shortTermDebts = data.Rubrics[i].Value;
        }
        if (data.Rubrics[i].Code == "10/49" && data.Rubrics[i].Period == "N") {
            balance.totalPassive = data.Rubrics[i].Value;
        }
        if (data.Rubrics[i].Code == "9904" && data.Rubrics[i].Period == "N") {
            balance.profit = data.Rubrics[i].Value;
        }
    }
    return balance;
}

export async function getBalance(enterprisenumber:string){
    let balance:Balance = {
        equity: 0,
        currentAssets: 0,
        shortTermDebts: 0,
        totalPassive: 0,
        profit: 0,
        depositDate: "",
    }
    let accountingDataUrl = await firstApiCall(enterprisenumber,balance);
    let receivedBalance:Balance = await secondApiCall(accountingDataUrl,balance);;
    let liquiditeitValue = liquiditeit(receivedBalance);
    let solvabiliteitValue = solvabiliteit(receivedBalance);
    let rentabiliteitValue = rentabiliteit(receivedBalance);
    formules = {
        liquiditeit: liquiditeitValue,
        solvabiliteit: solvabiliteitValue,
        rentabiliteit: rentabiliteitValue,
    }
    return formules;
}




export {}