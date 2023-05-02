/*Imporatie*/
const {MongoClient} = require('mongodb');
const connection = "mongodb+srv://nexus_admin:Nexus_123@nexus.09eb4ta.mongodb.net/Nexus?retryWrites=true&w=majority";
const client = new MongoClient(connection, {useUnifiedTopology: true});
/*Asynchrone functies*/
async function companyExist(referencenumber) {
    if (fetchCompany(referencenumber) == null) {
        return true;
    } else {
        return false;
    }
}
async function fetchCompany(referencenumber) {
    await client.connect();
    const company = await client.db('NBB').collection('Companies').findOne({referencenumber: referencenumber});
    await client.close();
    return company;
}
async function addCompany(company){
    if (!compannyExist(company.referencenumber)) {
        await client.connect();
        await client.db('NBB').collection('Companies').insertOne(company);
        await client.close();
    }
}
async function inHistory(username, referencenumber) {
    await client.connect();
    const answer = await client.db('NBB').collection('History').findOne({user: username, company: referencenumber});
    await client.close();
    if (answer == null) {
        return true;
    } else {
        return false;
    }
}
async function fetchHistory(username) {
    let companiesList = [];
    await client.connect();
    const cursor = await client.db('NBB').collection('History').find({user: username});
    const userHistory = await cursor.toArray();
    for (let index = 0; index < userHistory.length; index++) {
        for (const company of userHistory[i]) {
            companiesList.add(fetchCompany(company.referencenumber));
        }
    }
    await client.close();
    return companiesList;
}
async function addToHistory(username, referencenumber) {
    if (!inHistory(company.referencenumber)) {
        await client.connect();
        await client.db('NBB').collection('History').insertOne({user: username, company: referencenumber});
        await client.close();
    }
}
/*Exportatie*/
export * from "functions-db";