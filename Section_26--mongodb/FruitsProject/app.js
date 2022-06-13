//jshint esversion:6

const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const express = require("express");

const app = express();
const port = 3000;

// Connection URI
const uri =
  "mongodb://127.0.0.1:27017";

// Create a new MongoClient 
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("fruits").command({ ping: 1 });
    console.log("Connected successfully to server");

    // Make appropriate DB calls
    await listDatabases(client);
    await listCollections(client);
    await insertMany(client);
    await viewData(client);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databses:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function listCollections(client) {
  collectionsList = await client.db("test").listCollections().toArray();

  console.log("Collections:");
  console.log(collectionsList);
}

async function insertMany(client) {
  // Get the documents collection
  const collection = client.db().collection('fruits');

  // Insert documents
  const docs = [
    { name: "Apple", quantity: 5, review: "Great taste. Nice crunch!" },
    { name: "Banana", quantity: 3, review: "Tasted okay. Kind of mushy."},
    { name: "Grape", quantity: 10, review: "So juicy!" }
  ];

  const options = { ordered: true };

  const insertManyresult = await collection.insertMany(docs, options);
  let ids = insertManyresult.insertedIds;
  console.log(`${insertManyresult.insertedCount} documents were inserted.`);
  for (let id of Object.values(ids)) {
    console.log(`Inserted a document with id ${id}`);
  }
}

async function viewData(client) {
  // Get the documents collection
  const collection = client.db().collection('fruits');

  const findResult = await collection.find();

  console.log("Data from collection: ");
  await findResult.forEach(console.dir);
}

// run on port 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. http://localhost:3000`)
})