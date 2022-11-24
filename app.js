require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())

const routes = require('./routes');

require('./config/dbConfig.js')
app.listen(3000);

//Public route
app.get('/', (req,res) => {
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

app.use(routes);




