const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.Port || 6600
app.use(cors())
app.use(express.json())
// tasnianewturn
// f0Y6mzsBM76PbJW7

//start
console.log(process.env.DB_USER);

// const uri = "mongodb+srv://tasnianewturn:f0Y6mzsBM76PbJW7@cluster0.ioy1chb.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ioy1chb.mongodb.net/?retryWrites=true&w=majority`
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
    await client.connect();
    const database = client.db("Coffeedb");

    const haiku = database.collection("CoffeeCollection");
   
    app.get('/coffee',async(req,res)=>{
   
        const cursor = haiku.find();
        const dataall=await cursor.toArray();
        res.send(dataall);
        console.log(dataall);
    })
    app.post('/coffee',async(req,res)=>{
        const coffee=req.body;
        const result = await haiku.insertOne(coffee);
        console.log(result);
        res.send(result);


    })
    app.delete('/coffee/:id',async(req,res)=>{
        const id=req.params.id;
        // const user=req.body;
        const query = { _id: new ObjectId(id)};

        const result = await haiku.deleteOne(query);
        res.send(result);
    })
    app.get('/coffee/:id',async(req,res)=>{
        const id=req.params.id;
        const query = { _id: new ObjectId(id) };
        const movie = await haiku.findOne(query);
        res.send(movie);
        
    })
    app.put('/coffee/:id',async(req,res)=>{
        const id=req.params.id;
        const user=req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {

            $set: {
      
                coffename:user.coffename,
                quantity:user.quantity,
                supplies:user.supplies,
                Catagory:user.Catagory,
                Details:user.Details,
                Photo:user.Photo,
                Taste:user.Taste
      
            },
      
          };
      
          const result = await haiku.updateOne(filter, updateDoc, options);
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

//end
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/data',(req,res)=>{
    res.send("You have completed it successfully");
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})