import fetch from "node-fetch";
import { Company, fetchOptions} from "./types";
import {v4 as uuidv4} from 'uuid';
import e from "express";

/*variables*/
const apiKey: string = "5bca88bca6c74941af1a74c459833c52";
const requestId: string = `${uuidv4()}`;
let accountingDataUrl: string = "";
/*functions*/
async function getFetch(referencenumber:string):Promise<any> {
  const url = `https://ws.cbso.nbb.be/authentic/legalEntity/${referencenumber}/references`;
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

async function firstApiCall(companyData: Company):Promise<string>{
  let response = await getFetch(companyData.referencenumber);
  let responseData = await response.json();
  let bool = false;
    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].ExerciseDates.startDate >= "2022-01-01") {
        accountingDataUrl = responseData[i].AccountingDataURL;
        companyData.depositDate = responseData[i].DepositDate;
        bool = true;
        break;
      }
    }
    if (bool == false) {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].ExerciseDates.startDate >= "2021-01-01") {
          accountingDataUrl = responseData[i].AccountingDataURL;
          companyData.depositDate = responseData[i].DepositDate;
          bool = true;
          break;
        }
      }
    }
    if (bool == false) {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].ExerciseDates.startDate >= "2020-01-01") {
          accountingDataUrl = responseData[i].AccountingDataURL;
          companyData.depositDate = responseData[i].DepositDate;
          bool = true;
          break;
        }
      }
    }
    if (bool == false) {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].ExerciseDates.startDate >= "2019-01-01") {
          accountingDataUrl = responseData[i].AccountingDataURL;
          companyData.depositDate = responseData[i].DepositDate;
          bool = true;
          break;
        }
      }
    }
    if (bool == false) {
      accountingDataUrl = "data not found";
    }

  return accountingDataUrl;
}

async function secondApiCall(accountingDataUrl:string,companyData: Company):Promise<Company> {
  const fetchOptions:fetchOptions = {
    method: "GET",
    headers: {
      "NBB-CBSO-Subscription-Key": apiKey,
      "X-Request-Id": requestId,
      Accept: "application/x.jsonxbrl",
    },
    timeout: 12000,
  };
  if(accountingDataUrl == "data not found") {
    companyData.name = "No data found";
    companyData.address = "";
    companyData.depositDate = "";
    companyData.equities = 0;
    companyData.debts = 0;
    companyData.profit = 0;
    return companyData;
  }

  let response = await fetch(accountingDataUrl, fetchOptions);
  let data = await response.json();
      if (data.EnterpriseName == undefined) {
          companyData.name = "No data found";
          return companyData;
      }
      else {
          companyData.name = data.EnterpriseName;
      }

      if (data.Address.Street == undefined || data.Address.Number == undefined) {
          companyData.address = "No data found";
          return companyData;
      }
      else {
          companyData.address = data.Address.Street + " " + data.Address.Number;
      }
      if (data.Rubrics == undefined) {
          companyData.equities = 0;
          companyData.debts = 0;
          companyData.profit = 0;
          return companyData;
      }
      for(let i = 0; i < data.Rubrics.length; i++) {
          if (data.Rubrics[i].Code == "10/15" && data.Rubrics[i].Period == "N") {
              companyData.equities = data.Rubrics[i].Value;
          }
          if (data.Rubrics[i].Code == "17/49" && data.Rubrics[i].Period == "N") {
              companyData.debts = data.Rubrics[i].Value;
          }
          if (data.Rubrics[i].Code == "9905" && data.Rubrics[i].Period == "N") {
              companyData.profit = data.Rubrics[i].Value;
          }
      }
      return companyData;
}

export async function getCompanyData(referencenumber:string):Promise<Company> {
  let companyData: Company = {
    name: "",
    referencenumber: referencenumber,
    address: "",
    depositDate: "",
    equities: 0,
    debts: 0,
    profit: 0,
  };
  const accountingDataUrl = await firstApiCall(companyData);
  return await secondApiCall(accountingDataUrl, companyData);
}


export{};