/*Importatie*/
import { ObjectId } from "mongodb";//Het ObjectId-type

/*Interfaces*/
//Een bedrijf
interface Company {
    _id?:ObjectId,//Het automatisch gegeven id wanneer het bedrijf wordt opgeslagen in de databank
    name:string,//De naam van het bedrijf
    referencenumber:string,//Het ondernemingsnummer van het bedrijf
    address:string,//Het adres van het bedrijf
    depositDate: string,//De datum van neerlegging van de opgehaalde bedragen
    equities:number,//Het eigen vermogen van het bedrijf
    debts:number,//De schulden van het bedrijf
    profit:number,//De winst van het bedrijf
}
//Een gebruiker
interface User {
    username:string,//De gebruikersnaam van de gebruiker
    password:string,//Het wachtwoord van de gebruiker
}
//Een zoekopdracht
interface History {
    _id?:ObjectId,//Het automatisch gegeven id wanneer de zoekopdracht wordt opgeslagen in de databank
    username:string,//De gebruikersnaam van de gebruiker die de zoekopdracht verrichtte
    referencenumber:string,//Het ondernemingsnummer van het bedrijf die de gebruiker opzocht
}
//Een set van ophaalopties voor de API-oproep
interface fetchOptions {
    method: string;//Een mee te geven methode
    headers: {
      nbbCbsoSubscriptionKey: string;//Een geldige subscriptiesleutel
      xRequestId: string;//Een geldige aanvraag-id
      accept: string;//Het type van geretourneerde data
    };
    timeout: number;//De time-out tijd van de API-oproep
}

/*Exporatie*/
export { Company, User, History, fetchOptions }//De te gebruiken interfaces