const express = require("express");
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nocvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run() {
    try {
        await client.connect();
        // console.log("database connected");
        const database = client.db("traveler");
        const servicesCollection = database.collection('services');

        //GET Products API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
    }
    finally {
        // await client.close()
    }



};

run().catch(console.dir);




// add order product

app.post("/addOrder", (req, res) => {
    console.log(req.body);
})



app.get('/', (req, res) => {
    res.send("server is running")
})
app.get('/hello', (req, res) => {
    res.send("Updated services should be here")
})

app.listen(port, () => {
    console.log("server is running on port", port)
})