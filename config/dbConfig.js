const mongoose = require('mongoose');

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Connection
mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vd6g5nw.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log('Conectou ao banco')
}).catch((err) => console.log(err))