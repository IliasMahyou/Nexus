import fetch from "node-fetch";
import { CompanyData, fetchOptions, Balans } from "./types";
import e from "express";

/*variables*/
const apiKey: string = "5bca88bca6c74941af1a74c459833c52";
const requestId: string = "4b8e79a0-bd54-11eb-8529-0242ac130003";

let balans: Balans;
let accountingDataUrl: string = "";
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

async function firstApiCall(enterprisenumber:string,companyData: CompanyData):Promise<string>{
  let response = await getFetch(`${enterprisenumber}`);
  let responseData = await response.json();
  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].ExerciseDates.startDate >= "2022-01-01") {
      accountingDataUrl = responseData[i].AccountingDataURL;
      companyData.depositDate = responseData[i].DepositDate;
      break;
    } else if (responseData[i].ExerciseDates.startDate >= "2021-01-01") {
      accountingDataUrl = responseData[i].AccountingDataURL;
      companyData.depositDate = responseData[i].DepositDate;
      break;
    } else if (responseData[i].ExerciseDates.startDate >= "2020-01-01") {
      accountingDataUrl = responseData[i].AccountingDataURL;
      companyData.depositDate = responseData[i].DepositDate;
      break;
    } else if (responseData[i].ExerciseDates.startDate >= "2019-01-01") {
      accountingDataUrl = responseData[i].AccountingDataURL;
      companyData.depositDate = responseData[i].DepositDate;
      break;
    }
  }
  return accountingDataUrl;
}

async function secondApiCall(accountingDataUrl:string,companyData: CompanyData):Promise<any> {
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
          companyData.equity = 0;
          companyData.debt = 0;
          companyData.profit = 0;
          return companyData;
      }
      for(let i = 0; i < data.Rubrics.length; i++) {
          if (data.Rubrics[i].Code == "10/15" && data.Rubrics[i].Period == "N") {
              companyData.equity = data.Rubrics[i].Value;
          }
          if (data.Rubrics[i].Code == "17/49" && data.Rubrics[i].Period == "N") {
              companyData.debt = data.Rubrics[i].Value;
          }
          if (data.Rubrics[i].Code == "9905" && data.Rubrics[i].Period == "N") {
              companyData.profit = data.Rubrics[i].Value;
          }
      }
      return companyData;
}

export async function getCompanyData(enterprisenumber:string):Promise<CompanyData> {
  let companyData: CompanyData = {
    name: "",
    address: "",
    depositDate: "",
    equity: 0,
    profit: 0,
    debt: 0,
  };
  let accountingDataUrl = await firstApiCall(`${enterprisenumber}`, companyData);
  let receivedCompanyData = await secondApiCall(accountingDataUrl, companyData);
  return receivedCompanyData;
}


export{};