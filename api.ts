/*Importatie*/
import fetch from "node-fetch";//De fetch-functie
import { Company, FetchOptions} from "./types";//Te gebruiken interfaces
import {v4 as uuidv4} from 'uuid';//Te gebruiken UUID-functies

/*Constanten*/
const apiKey: string = "5bca88bca6c74941af1a74c459833c52";//De API-sleutel
const requestId: string = `${uuidv4()}`;//De aanvraag-Id

/*Variabelen*/
let accountingDataUrl: string = "";//De link nodig voor de bedragendata op te halen

/*Functies*/
//Zoekt naar een bedrijf met een API-oproep
//@param  referencenumber Het ondernemingsnummer dat men wil oproepen
//@return Het eerste API-antwoord
async function getFetch(referencenumber:string): Promise<any>{
  const url: string = `https://ws.cbso.nbb.be/authentic/legalEntity/${referencenumber}/references`;//De API-oproeplink
  //De ophaalopties voor de API-oproep
  const fetchOptions: FetchOptions = {
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
//Bevraagt de API voor de eerste data op en de link naar de bedragendata
//@param  companyData Het deels in te vullen bedrijf
//@return De link naar de bedragendata, anders ""
async function firstApiCall(companyData: Company): Promise<string> {
  const response: any = await getFetch(companyData.referencenumber);//Het antwoord van de API-oproep
  const responseData: any = await response.json();//Het antwoord van de API-oproep in JSON-formaat
  let found = false;//Als de recentste data al dan niet is gevonden
  //Kijkt na of er data te vinden is vanaf de meegegeven datum
  //@param  startDate De datum
  //@return True indien er data is gevonden vanaf de meegegeven datum, anders false
  const checkResponseData = (startDate: string): boolean => {
    //Voor elk antwoordonderdeel in het API-antwoord (in JSON-formaat) wordt geëvalueerd
    for (let i = 0; i < responseData.length; i++) {
      //Als een antwoordonderdeel als startdatum de meegegeven datum bevat dan wordt er verder geëvalueerd
      if (responseData[i].ExerciseDates.startDate >= startDate) {
        //Als een antwoordonderdeel een link naar de bedragendata heeft, dan wordt deze bijgehouden
        if (responseData[i].AccountingDataURL !== null) {
          accountingDataUrl = responseData[i].AccountingDataURL;
        }
        companyData.depositDate = responseData[i].DepositDate;
        companyData.name = responseData[i].EnterpriseName;
        found = true;
        break;
      }
    }
    return found;
  };
  //Als er geen data is vanaf 1 januari 2022, dan wordt er verder geëvalueerd
  if (!checkResponseData("2022-01-01")) {
    //Als er geen data is vanaf 1 januari 2021, dan wordt er verder geëvalueerd
    if (!checkResponseData("2021-01-01")) {
      //Als er geen data is vanaf 1 januari 2020, dan wordt er gekeken naar de informatie vanaf 1 januari 2019 
      if (!checkResponseData("2020-01-01")) {
        checkResponseData("2019-01-01");
      }
    }
  }
  if (!found) {
    accountingDataUrl = "";
  }
  return accountingDataUrl;
}
//Bevraagt de API voor de overige data en bedragendata
//@param  accountingDataUrl De link naar de bedragendata
//@param  companyData Het verder aan te vullen bedrijf
//@return De bedrijfsdata
async function secondApiCall(accountingDataUrl:string,companyData: Company): Promise<Company>{
  //De ophaalopties voor de API-oproep
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      "NBB-CBSO-Subscription-Key": apiKey,
      "X-Request-Id": requestId,
      Accept: "application/x.jsonxbrl",
    },
    timeout: 12000,
  };
  //Als er geen link naar bedragendata is, dan wordt, op de bedrijfsnaam na, lege bedrijfsdata teruggestuurd
  if (accountingDataUrl == "") {
    companyData.name;
    companyData.address = "No data found";
    companyData.depositDate = "No data found";
    companyData.equities = 0;
    companyData.debts = 0;
    companyData.profit = 0;
    return companyData;
  }
  const response: any = await fetch(accountingDataUrl, fetchOptions);//Het antwoord van de API-oproep
  const data: any = await response.json();//Het antwoord van de API-oproep in JSON-formaat
  //Als er geen straat of huisnummer te vinden is, dan wordt het adres van het bedrijf als niet gevonden gelabeld, anders wordt het adres ingevuld
  if (data.Address.Street == undefined || data.Address.Number == undefined) {
    companyData.address = "No data found";
  } else {
    companyData.address = data.Address.Street + " " + data.Address.Number;
  }
  //Voor elke bedragonderdeel wordt er geëvalueerd
  for (let i = 0; i < data.Rubrics.length; i++) {
    //Als een eigen vermogen gekend zijn, dan worden deze ingevuld
    if (data.Rubrics[i].Code == "10/15" && data.Rubrics[i].Period == "N") {
      companyData.equities = parseFloat(data.Rubrics[i].Value);
    }
    //Als er schulden gekend zijn, dan worden deze opgeslagen
    if (data.Rubrics[i].Code == "17/49" && data.Rubrics[i].Period == "N") {
      companyData.debts = parseFloat(data.Rubrics[i].Value);
    }
    //Als de bedrijfwinst gekend is, dan wordt deze opgeslagen
    if (data.Rubrics[i].Code == "9905" && data.Rubrics[i].Period == "N") {
      companyData.profit = parseFloat(data.Rubrics[i].Value);
    }
  }
  return companyData;
}
//Haalt bedrijfsdata op
//@param  referencenumber Het ondernemingsnummer van het gewenste bedrijf
//@return De bedrijfsdata
export async function getCompanyData(referencenumber:string):Promise<Company> {
  //Nog niet ingevulde bedrijfsdata
  let companyData: Company = {
    name: "",
    referencenumber: referencenumber,
    address: "",
    depositDate: "",
    equities: 0,
    debts: 0,
    profit: 0,
  };
  const accountingDataUrl = await firstApiCall(companyData);//De link naar de bedragendata
  return await secondApiCall(accountingDataUrl, companyData);
}