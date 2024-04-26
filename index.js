const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 5000;

// MiddleWare

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvsc5ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const touristCollection = client.db('toursite').collection('touristspot');

    app.get('/touristspot', async(req, res) => {
      const cursor = touristCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/touristspot/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await touristCollection.findOne(query);
      res.send(result);
    })

    app.post('/touristspot', async(req, res) => {
      const newTourSpot = req.body;
      console.log(newTourSpot);

      const result = await touristCollection.insertOne(newTourSpot);
      res.send(result);
    })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Assignment 10 server is running')
})

app.listen(port, () => {
  console.log(`Assignment 10 server is running on port: ${port}`)
})





