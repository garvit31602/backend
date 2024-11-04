const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/User'); // Import your User model
const cors = require('cors');

mongoose.connect('mongodb+srv://garvit31602:garvit2002@cluster0.inhph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      console.log(userExists);
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const user = new User({ username, password });
      await user.save();
      console.log("New user created");
      return res.status(201).json({ message: "New user created", user });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});
