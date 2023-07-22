const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const corsConfig={
  origin:"*",
  credentials:true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}

// middleware
app.use(cors(corsConfig));
app.options("*", cors(corsConfig))
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emaoomz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

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
    const collegesCollection = client.db('uniPlanetDB').collection('universities');

    // Creating index on two fields
    // const indexKeys = { name: 1, subCategory: 1 }; // Replace field1 and field2 with your actual field names
    // const indexOptions = { name: "nameCategory" }; // Replace index_name with the desired index name
    // const result = toysCollection.createIndex(indexKeys, indexOptions);
    // console.log(result);


    app.get('/universities', async (req, res) => {
      const result = collegesCollection.find({}).toArray(); //why {}
      res.send(result);
      // console
    })

    // for category section
    app.get("/universitiesByCategory/:subCategory", async (req, res) => {
      console.log(req.params.id);
      const colleges = await collegesCollection
        .find({
          subCategory: req.params.subCategory,
        })
        .toArray();
      res.send(colleges);
    });

    // for details a toy page
    app.get('/universities/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const options = {
        projection: { title: 1, price: 1, pictureUrl: 1,  name :1, rating:1, quantity:1, description:1, subCategory:1, review:1, detailDescription:1},
      };
      const result = await collegesCollection.findOne(query, options);
      res.send(result);
    })

    // for add a colleges page
    app.post('/allPostUniversities', async (req, res) => {
      const newColleges = req.body;
      console.log(newColleges);
      const result = await collegesCollection.insertOne(newColleges);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert.please try again later",
          status: false,
        });
      }
    })

    // for all Colleges page
    app.get('/allPostUniversities', async (req, res) => {
      try{
        const cursor =await collegesCollection.find({}).limit(20);   //not need limit
        const result = await cursor.toArray();
        // console.log(result)
        res.send(result);
      }
      catch(err){
        res.status (500).send({
          message: err.message
        })
      }
    })
    app.get("/searchToysByText/:text", async (req, res) => {
      const text = req.params.text;
      const result = await collegesCollection
        .find({
          $or: [
            { name: { $regex: text, $options: "i" } },
            { subCategory: { $regex: text, $options: "i" } },
          ],
        })
        .toArray();
      res.send(result);
    });

    // for my toys page
    app.get("/myallPostUniversities", async (req, res) => {
      console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }
      const options ={
        sort:{"price":1},
      }
      const result = await collegesCollection.find(query, options).toArray();
      res.send(result);
    });
    

    app.delete('/myToys/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await collegesCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/myToys/:id', async(req, res) => {
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updatedToy = {
        $set: {
          name: body.name, 
          quantity: body.quantity, 
          toyName: body.toyName, 
          price: body.price, 
          email: body.email, 
          photo: body.photo
        }
      }

      const result = await collegesCollection.updateOne(filter, updatedToy, options);
      res.send(result);
    })


  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('College booking server is running')
})


app.listen(port, () => {
  console.log(`College booking Server is running on port: ${port}`)
})


