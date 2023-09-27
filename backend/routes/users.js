const express = require('express');
const router = express.Router();
const User = require("../models/userModel");

// Get all users
router.get('/users', async (req, res) => {
try {
    const users = await User.find({});
    res.status(200).json(users);
} catch(error) {
    console.log(error.message);
    res.status(500).json({message : error.message});
} 
})

// Get user by id
router.get('/users/:id', async (req, res) => {
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
router.post("/users", async (req, res) => {
try {
    const user = await User.create(req.body);
    res.status(200).json(user);
} catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
});

// Update user by id
router.put("/users/:id", async (req, res) => {
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
router.delete('/users/:id', async (req, res) => {
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

module.exports = router;