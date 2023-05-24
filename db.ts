import { MongoClient, ObjectId } from "mongodb";
import { Company, User, History } from "./types";
// url naar database Nexus mongoDB

const uri =
  "mongodb+srv://nexus_admin:Nexus123@nexus.09eb4ta.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
/*Asynchrone functies*/

async function fetchCompany(referencenumber: string) {
  return await client
    .db("NBB")
    .collection("Companies")
    .findOne({ referencenumber: referencenumber });
}
async function addCompany(company: Company) {
  await client
    .db("NBB")
    .collection("Companies")
    .updateOne(company, { $set: company }, { upsert: true });
}
async function userExist(userData: User) {
  const user = await client
    .db("NBB")
    .collection("Users")
    .findOne({ name: userData.name, password: userData.password });
  if (user == null) {
    return false;
  } else {
    return true;
  }
}
async function addUser(user: User) {
  if (!userExist(user)) {
    // user.name werkt niet
    await client.db("NBB").collection("Users").insertOne(user);
  }
}
async function inHistory(search: History) {
  return await client
    .db("NBB")
    .collection("History")
    .findOne({ user: search.username, company: search.referencenumber });
}
async function fetchHistory(username: string) {
  return await client
    .db("NBB")
    .collection("History")
    .find({ user: username })
    .toArray();
}
async function addToHistory(search: History) {
  await client
    .db("NBB")
    .collection("History")
    .updateOne(
      { user: search.username, referencenumber: search.referencenumber },
      {
        $set: {
          user: search.username,
          referencenumber: search.referencenumber,
        },
      },
      { upsert: true }
    );
}

const connect = async () => {
  await client.connect();
};

const exit = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error(error);
  }
};

/*Exportatie*/
export {
  userExist,
  fetchHistory,
  fetchCompany,
  connect,
  exit,
  addToHistory,
  addCompany,
  inHistory,
  client,
};
