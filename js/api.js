/*Importatie*/
import fetch from "node-fetch";
import { fetchCompanyDataIntoMongoDB } from "./dataBase.mjs";
/*Constantedeclaratie*/
const apiKey = "5bca88bca6c74941af1a74c459833c52";
const requestId = "4b8e79a0-bd54-11eb-8529-0242ac130003";
const fetchOptions1 = {
  method: "GET",
  headers: {
    "NBB-CBSO-Subscription-Key": apiKey,
    "X-Request-Id": requestId,
    Accept: "application/json",
  },
  timeout: 120,
};
/*Variabelendeclaratie*/
let accountingDataUrl;
/*Synchrone functies*/
export function firstApiCall(referencenumber, callback) {
  const apiEndpoint1 = `https://ws.cbso.nbb.be/authentic/legalEntity/${referencenumber}/references`
  fetch(apiEndpoint1, fetchOptions1)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ExerciseDates.startDate >= "2022-01-01") {
          accountingDataUrl = data[i].AccountingDataURL;
          callback();
          break;
        } else if (data[i].ExerciseDates.startDate >= "2021-01-01") {
          accountingDataUrl = data[i].AccountingDataURL;
          callback();
          break;
        } else if (data[i].ExerciseDates.startDate >= "2020-01-01") {
          accountingDataUrl = data[i].AccountingDataURL;
          callback();
          break;
        } else if (data[i].ExerciseDates.startDate >= "2019-01-01") {
          accountingDataUrl = data[i].AccountingDataURL;
          callback();
          break;
        }
      }
    })
    .catch((error) => console.error(error));
}
export function secondApiCall() {
  const apiEndpoint = `${accountingDataUrl}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "NBB-CBSO-Subscription-Key": apiKey,
      "X-Request-Id": requestId,
      Accept: "application/x.jsonxbrl",
    },
    timeout: 120,
  };
  fetch(apiEndpoint, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      createCompany(data);
    })
    .catch((error) => console.error(error));
}