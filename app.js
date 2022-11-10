require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Connection
mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vd6g5nw.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
    console.log('Conectou ao banco')
}).catch((err) => console.log(err))


//Public route
app.get('/', (req,res) => {
    console.log('consultei')
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

//Models
const User = require('./models/User')

//Routes

//Register User
app.post('/auth/signup', async(req,res) => {

    const {name, email, password} = req.body;

    //check if user exists
    const userExists = await User.findOne({email: email});
    if(userExists){
        return res.status(422).json({msg: 'E-mail already used'});
    }

    //security password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
        name,
        email,
        password : passwordHash
    })

    try {
        
        await user.save();
        res.status(201).json({
            msg: 'User created successfully'
        })

        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! Try again later'
        });
    }

})

//Login User
app.post('/auth/login', async (req,res) => {

    const {email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).json({msg: 'User not found'});
    }

    //check if password matchs

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json({msg: 'Invalid password'})
    }


    try {
        
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id,
        }, secret)

        res.status(200).json({msg: 'Authentication successful', token})
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! Try again later'
        });
    }

})






