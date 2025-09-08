const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { config } = require('node:process');
const path = require('node:path');
const User = require('./model/UserSchema');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const {items} = require('./model/items');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : ['http://localhost:5173','https://e-commerce-2-pjs6.onrender.com'],
    credentials : true
}));
app.use('/public', express.static('public'));
require('dotenv').config({path:'./.env'});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;


//DATABASE CONNECT
mongoose.connect(MONGO_URL)
.then((res)=>{
    console.log("Connected to the database");
})
.catch((err)=>{
    console.log("Error:",err);
})

//Sign Up ---
app.post('/signup' , async(req ,res)=>{
    try{
    const {name,email,password} = req.body; 

    const user = await User.findOne({email});
    if(user){
        return res.json({message:"User Already exsist"});
    }
    const create =  await User.create({
        name:name,
        email:email,
        password:password
    });
    res.status(200).json({message:"user created",status:200});

    }catch(err){
        console.log("Error occured :" , err);
        res.status(500).json({message:"Please try again later !"});  
    }
})

//Login ---
app.post('/login' , async(req,res)=>{
    try{
    const {email,password} = req.body;

    const IsExist = await User.findOne({email:email});
    if(IsExist){ 
      const pass = await IsExist.comparePassword(password);
      if(pass){
        jwt.sign({
            email:IsExist.email,
            id : IsExist._id
        },jwtSecret,(err,token)=>{
            if(err){
                throw err;
            }
            return res.cookie('token',token,{
                httpOnly:true,
                secure:isProduction,
                sameSite:isProduction?'none':'lax'
            })
            .status(200)
            .json({message:"success"});
        })
      }else{
        res.status(401).json({message:"Incorrect Password"});
      }
    }else{
        res.status(401).json({message:"Email not found"});
    }
  }catch(err){
    console.log("error:" , err);
    res.status(500).json({message:"Something went wrong.Please try later."});
  }
})

//Items ---
app.get('/items',async(req,res)=>{
    try{
    res.json(items);
    }catch(err){
        res.status(500).json({message:"Error occured"});
    }
})

//PORT 
app.listen(PORT , ()=>{
        console.log("Server started at port" , PORT);
});