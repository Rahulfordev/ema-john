const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");

require("dotenv").config();

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// firebase
var serviceAccount = require("./configs/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MongoDB connection URI
const uri = process.env.MONGO;

// Create a MongoClient instance
const client = new MongoClient(uri);

async function accessCollection() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("allphones");
    const collection = database.collection("allphone");
    const orderCollection = database.collection("order");
    const bookingCollection = database.collection("hotel");

    // Define routes
    app.post("/addProduct", (req, res) => {
      const products = req.body;
      collection
        .insertOne(products)
        .then((result) => {
          console.log("Products added:", result.insertedIds);
          res.send("Products added successfully");
        })
        .catch((error) => {
          console.error("Error adding products:", error);
          res.status(500).send("Error adding products");
        });
    });

    app.get("/products", async (req, res) => {
      try {
        const product = await collection.find({}).toArray();
        res.json(product);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
      }
    });

    app.post("/addOrder", (req, res) => {
      const order = req.body;
      orderCollection
        .insertOne(order)
        .then((result) => {
          console.log("Products added:", result.insertedIds);
          res.send("Products added successfully");
        })
        .catch((error) => {
          console.error("Error adding products:", error);
          res.status(500).send("Error adding products");
        });
    });

    app.post("/addBooking", (req, res) => {
      const booking = req.body;
      bookingCollection
        .insertOne(booking)
        .then((result) => {
          console.log("Products added:", result);
          res.send("Products added successfully");
        })
        .catch((error) => {
          console.error("Error adding products:", error);
          res.status(500).send("Error adding products");
        });
    });

    app.get("/booking", async (req, res) => {
      try {
        const bearer = req.headers.authorization;
        if (bearer && bearer.startsWith("Bearer ")) {
          const idToken = bearer.split(" ")[1];

          // idToken comes from the client app
          admin
            .auth()
            .verifyIdToken(idToken)
            .then(async (decodedToken) => {
              const tokenEmail = decodedToken.email;
              const queryEmail = req.query.email;
              // console.log(tokenEmail, queryEmail);
              if (tokenEmail === queryEmail) {
                const bookingData = await bookingCollection
                  .find({ email: queryEmail })
                  .toArray();
                res.json(bookingData); // Send the fetched data back to the client
              } else {
                res.status(403).send("Unauthorized"); // Send an unauthorized status if the emails don't match
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send("Error verifying token");
            });
        } else {
          res.status(401).send("Unauthorized"); // Send an unauthorized status if no token is provided
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

accessCollection();

// Serve index.html
app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
