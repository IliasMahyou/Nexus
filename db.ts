/*Importatie*/
import { MongoClient, WithId, Document } from "mongodb";//Te gebruiken MongoDb-interfaces
import { Company, User, History } from "./types";//Te gebruiken interfaces

/*Constantedeclaraties*/
const uri = "mongodb+srv://nexus_admin:Nexus123@nexus.09eb4ta.mongodb.net/?retryWrites=true&w=majority";//De connectielink naar de Nexus-databank
const client = new MongoClient(uri);//De connectie naar de Nexus-databank
const connect = async () => await client.connect();//Opent de connectie met de databank

/*Functiedefinities*/
//Haalt bedrijfsgegeven op van het bedrijf met het meegegeven ondernemingsnummer
//@param  referencenumber Het ondernemingsnummer van het gewenste bedrijf
//@return MongoDb-data van het bedrijf als deze bestaat, anders niks
async function fetchCompany(referencenumber: string): Promise<WithId<Document> | null>{
  return await client
    .db("NBB")
    .collection("Companies")
    .findOne({ referencenumber: referencenumber });
}
//Voegt een bedrijf toe in de tabel 'Companies'
//@param  company Het toe te voegen bedrijf
async function addCompany(company: Company): Promise<void>{ 
  await client
    .db("NBB")
    .collection("Companies")
    .updateOne(company, { $set: company }, { upsert: true });
}
//Gaat na of een gebruiker bestaat in de databank
//@param  userData  De op te vragen gebruikersdata
//@return True indien de gebruikersdata terug kan gevonden worden, anders false
async function userExist(userData: User): Promise<Boolean>{
  const user = await client.db("NBB").collection("Users").findOne({ name: userData.username, password: userData.password });//De eventueel gevonden gebruiker
  return user == null ? true : false;  //Als de gebruiker kan worden gevonden, wat er true teruggegeven, anders false
}
//Haalt de zoekgeschiedenis op van de meegegeven gebruiker
//@param  username  De gebruikersnaam van de gebruiker
//@return Een reeks met alle zoekopdrachten van de gebruiker
async function fetchHistory(username: string): Promise<WithId<Document>[]>{
  return await client
    .db("NBB")
    .collection("History")
    .find({ user: username })
    .toArray();
}
//Voegt een zoekopdracht toe in de tabel 'History'
//@param  search  De toe te voegen zoekopdracht
async function addToHistory(search: History): Promise<void>{
  await client
    .db("NBB")
    .collection("History")
    .updateOne({ user: search.username, referencenumber: search.referencenumber }, { $set: { user: search.username, referencenumber: search.referencenumber }},{ upsert: true });
}

/*Exportatie*/
export { userExist, fetchHistory, fetchCompany, connect, addToHistory, addCompany }//De te gebruiken functies
export { client }//De te gebruiken constanten