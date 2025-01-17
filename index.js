const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 5000;

// MiddleWare

app.use(cors({
  origin: ['https://trektales0108.netlify.app', 'http://localhost:5180', 'https://assignment-10-server-7jxi4slfj-atiks-projects-ca41f1e3.vercel.app']

}));
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
    // await client.connect();

    const touristCollection = client.db('toursite').collection('touristspot');
    

    app.get('/touristspot', async(req, res) => {
      const cursor = touristCollection.find();
      const result = await cursor.toArray();
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result);
    })
    

    app.get('/touristspot/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await touristCollection.findOne(query);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result);
    })


    app.post('/touristspot', async(req, res) => {
      const newTourSpot = req.body;
      console.log(newTourSpot);
      res.header("Access-Control-Allow-Origin", "*");
      const result = await touristCollection.insertOne(newTourSpot);
      res.send(result);
    })


    app.delete('/touristspot/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await touristCollection.deleteOne(query);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result);
    })


    app.put('/touristspot/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateTourCard = req.body;
      const TourCard = {
        $set: {
          name: updateTourCard.name,
          image: updateTourCard.image,
          country: updateTourCard.country,
          location: updateTourCard.location,
          short_description: updateTourCard.short_description,
          average_cost: updateTourCard.average_cost,
          seasonality: updateTourCard.seasonality,
          travel_time: updateTourCard.travel_time,
          total_visitors_per_year: updateTourCard.total_visitors_per_year
        }
      }
  
      const result = await touristCollection.updateOne(filter, TourCard, options);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result);
     })



     app.delete('/touristspot/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await touristCollection.deleteOne(query);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result);
    })





    // Country 
    const countryCollection = client.db('toursite').collection('country');
    
    app.get('/country', async(req, res) => {
      const cursor = countryCollection.find();
      const result = await cursor.toArray();
      res.header("Access-Control-Allow-Origin", "*");
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





