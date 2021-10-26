const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const cors = require('cors');

const app = express();
const port = 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uc5dq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try{
        await client.connect();
        const database = client.db('carMecanic');
        const servicesCollection = database.collection('services');

        // GET API 
        app.get('/services',async(req,res)=>{
            const query = {}
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);

        })

        // GET API 
        app.get('/service/:serviceid', async(req,res)=>{
            const id = req.params.serviceid
            const query = {_id:ObjectId(id)}
            const result = await servicesCollection.findOne(query)
            console.log("seccess result ",result);
            res.json(result)
        })

        // POST API 
        app.post('/services',async(req,res)=>{
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.send(result);
        })
        
        
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    console.log("I am hitting server");
    res.send("Running Geneous Server");
})

app.listen(port,()=>{
    console.log('I am listening from port ', port);
})