/*Imporatie*/
const {MongoClient} = require('mongodb');//MongoDB-functionaliteiten
/*Overige constantendeclaraties*/
const connection = "";//Connectiestring met de db
const client = new MongoClient(connection, {useUnifiedTopology: true});//Connectieclient