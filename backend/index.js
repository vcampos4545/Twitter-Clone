require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/userModel")

// Create an Express application
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Constants
const PORT = process.env.PORT || 8080;
const DB_URI = process.env.MONGO_DB_URI;

// Home page
app.get('/', (req, res) => {
  res.json({"users" : ["userOne", "userTwo", "userThree"]});
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch(error) {
      console.log(error.message);
      res.status(500).json({message : error.message});
  } 
})

// Get user by id
app.get('/users/:id', async (req, res) => {
  try {
      const {id} = req.params;
      const users = await User.findById(id);
      res.status(200).json(users);
  } catch(error) {
      console.log(error.message);
      res.status(500).json({message : error.message});
  } 
})

// Create user
app.post("/users", async (req, res) => {
  try {
      const user = await User.create(req.body);
      res.status(200).json(user);
  } catch(error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
  }
});

// Update user by id
app.put("/users/:id", async (req, res) => {
  try {
      const {id} = req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
      // Cant find user in DB
      if (!user) {
      return res.status(404).json({message : `Cannot find user with id: ${id}`})
      }
      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
  } catch(error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
  }
})

// Delete user by id
app.delete('/users/:id', async (req, res) => {
  try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
      return res.status(404).json({message : `Could not find user with id ${id}`})
      }
      res.status(200).json(user);
  } catch(error) {
      res.status(500).json({message : error.message});
  }
})

// Connect to MongoDB
mongoose.connect(DB_URI)
.then(() => {
  console.log("Connected to MongoDB")
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log(error);
})

