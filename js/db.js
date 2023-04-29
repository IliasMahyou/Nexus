/*Imporatie*/
const {MongoClient} = require('mongodb');//MongoDB-functionaliteiten
/*Overige constantendeclaraties*/
const connection = "";//Connectiestring met de db
const client = new MongoClient(connection, {useUnifiedTopology: true});//Connectieclient
/*Asynchrone arrowfuncties*/
const fetchCompanyData = async (referencenumber) => {
    await client.connect();
    const company = await client.db('NBB').collection('companies').findOne({referencenumber: referencenumber});
    return company;
}