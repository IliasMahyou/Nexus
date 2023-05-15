import { MongoClient,ObjectId } from "mongodb";
import {Company, User, History} from "./types";
// url naar database Nexus mongoDB

const uri = "mongodb+srv://nexus_admin:Nexus123@nexus.09eb4ta.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
/*Asynchrone functies*/


async function companyExist(referencenumber:string) {
  if (fetchCompany(referencenumber) == null) {
    return true;
  } else {
    return false;
  }
}
async function fetchCompany(referencenumber:string) {
  const company = await client
    .db("NBB")
    .collection("Companies")
    .findOne({ referencenumber: referencenumber });
  return company;
}
async function addCompany(company:Company) {
  if (!companyExist(company.referencenumber)) {
    connect();
    await client.db("NBB").collection("Companies").insertOne(company);
    exit();
  }
}
async function userExist(userData:User) {
  const user = await client
    .db("NBB")
    .collection("Users")
    .findOne({ name: userData.name, password: userData.password });
    console.log(user);
  if (user == null) {
    return false;
  } else {
    return true;
  }
}
async function addUser(user:User) {
  if (!userExist(user)) {// user.name werkt niet
    connect();
    await client.db("NBB").collection("Users").insertOne(user);
    exit();
  }
}
async function inHistory(search:History) {
  connect();
  const answer = await client
    .db("NBB")
    .collection("History")
    .findOne({ user: search.username, company: search.referencenumber });
  exit();
  if (answer == null) {
    return true;
  } else {
    return false;
  }
}
async function fetchHistory(username:string) {
  let companiesList:any = [];
  connect();
  const userHistory = await client
    .db("NBB")
    .collection("History")
    .find({ user: username }).toArray();
    for (const search  of userHistory) {
       const company = fetchCompany(search.referencenumber)
      companiesList.push(company);
    }
  exit();
  return companiesList;
}
async function addToHistory(search:History) {
  if (!inHistory(search)) {
    await client
      .db("NBB")
      .collection("History")
      .insertOne({ user: search.username, referencenumber: search.referencenumber });
  }
}


const connect = async () => {
  const client = new MongoClient(uri);
  await client.connect();
}

const exit = async () => {
  try {
      await client.close();
  } catch (error) {
      console.error(error);
  }
}

/*Exportatie*/
export {userExist, fetchHistory, fetchCompany, connect, exit, addToHistory};