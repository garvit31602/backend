const express=require("express")
const mongoose=require("mongoose")
const User=require('./models/User')
const cors = require('cors'); 

mongoose.connect('mongodb+srv://garvit31602:garvit2002@cluster0.inhph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('mongodb connected')})
.catch((e)=>{
        console.error(e)
    })

const app=express()
app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
    const {username,password}=req.body
        try {
          const user = await User.findOne({ username, password }); 
          if (user) {
            res.status(200).json({ message: "Login successful", user });
          } else {
            res.status(400).json({ message: "Invalid credentials" });
          }
        } catch (error) {
          res.status(500).json({ message: "Server error", error });
        }
      });