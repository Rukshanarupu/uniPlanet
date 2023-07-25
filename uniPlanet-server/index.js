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
    const admissionCollection = client.db('uniPlanetDB').collection('postedAdmissionInfo');

    app.get('/universities', async (req, res) => {
      const result = await collegesCollection.find().toArray();
      res.send(result);
      // console.log(result)
    })

    // for college details page
    app.get('/universities/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const options = {
        projection: { image: 1, name: 1, college_rating: 1,  admission_date :1, admission_process:1, number_of_research:1, sports_facility:1, research_history:1, review:1, events_details:1, research_works:1},
      };
      const result = await collegesCollection.findOne(query, options);
      res.send(result);
    })

    // implement search button
    app.get("/searchCollegeByText/:text", async (req, res) => {
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
      console.log(result)
    });

    // for admission page
    app.post('/postedAdmissionInfo', async (req, res) => {
      const newColleges = req.body;
      // console.log(newColleges);
      const result = await admissionCollection.insertOne(newColleges);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert.please try again later",
          status: false,
        });
      }
    })

    // for my Colleges page
    app.get('/postedAdmissionInfo', async (req, res) => {
      try{
        const result =await admissionCollection.find().toArray();
        // console.log(result)
        res.send(result);
      }
      catch(err){
        res.status (500).send({
          message: err.message
        })
      }
    })

    // for college edit page
    app.get('/postedAdmissionInfo/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const options = {
        projection: { photo:1, subject:1, college:1, number:1, name: 1, email:1},
      };
      const result = await admissionCollection.findOne(query, options);
      res.send(result);
    })

    // if need to delete the selected college
    app.delete('/myColleges/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await admissionCollection.deleteOne(query);
      res.send(result);
    })

    // update college info
    app.put('/myColleges/:id', async(req, res) => {
      const id = req.params.id;
      const body = req.body;
      // console.log(body);
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updatedCollege = {
        $set: {
          name: body.name, 
          email: body.email, 
          photo: body.photo,
          subject: body.subject,
          number: body.number,
          address: body.address,
          dob: body.dob,
          college:body.college
        }
      }

      const result = await admissionCollection.updateOne(filter, updatedCollege, options);
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


