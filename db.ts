import { MongoClient,ObjectId } from "mongodb";
import {Company, User, History} from "./types";
// url naar database Nexus mongoDB

const uri =
  "mongodb+srv://nexus_admin:Nexus_123@nexus.09eb4ta.mongodb.net/Nexus?retryWrites=true&w=majority";
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
  connect();
  const company = await client
    .db("NBB")
    .collection("Companies")
    .findOne({ referencenumber: referencenumber });
  exit();
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
  connect();
  const user = await client
    .db("NBB")
    .collection("Users")
    .findOne({ name: userData.name, password: userData.password });
  exit();
  if (user == null) {
    return true;
  } else {
    return false;
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
async function fetchHistory(username:User) {
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
    connect();
    await client
      .db("NBB")
      .collection("History")
      .insertOne({ user: search.username, company: search.referencenumber });
    exit();
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