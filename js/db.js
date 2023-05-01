/*Imporatie*/
const {MongoClient} = require('mongodb');//MongoDB-functionaliteiten
/*Overige constantendeclaraties*/
const connection = "mongodb+srv://nexus_admin:Nexus_123@nexus.09eb4ta.mongodb.net/Nexus?retryWrites=true&w=majority";//Connectiestring met de db
const client = new MongoClient(connection, {useUnifiedTopology: true});//Connectieclient
/*Asynchrone functies*/
async function fetchCompanyData(referencenumber) {
    await client.connect();
    const company = await client.db('NBB').collection('Companies').findOne({referencenumber: referencenumber});
    return company;
}