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
    if (!compannyExist) {
        await client.connect();
        await client.db('NBB').collection('Companies').insertOne(company);
        await client.close();
    }
}