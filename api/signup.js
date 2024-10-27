const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb+srv://garvit31602:garvit2002@cluster0.inhph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.error(e));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        res.status(400).json({ message: "Username already exists" });
      } else {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "New user created", user });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
