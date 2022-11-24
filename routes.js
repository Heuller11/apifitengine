const express = require('express');
const routes = express.Router();

const usersController = require('./controllers/usersController')
const telegramController = require('./controllers/telegramController')


//Users
//Register
routes.post('/auth/signup', usersController.signup)
//Login
routes.post('/auth/login', usersController.login)


//Telegram
//Message Interval
routes.post('/messagehalftime', telegramController.sendMessageHalfTime)

// app.post('/routeTest', checkToken, async (req,res) => {
function checkToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(" ")[1] : false;

    if(!token){
        return res.status(401).json({msg: 'Access denied'});
    }

    try {
        
        const secret = process.env.SECRET;
        jwt.verify(token,secret);
        next();

    } catch (error) {
        res.status(400).json({msg: 'Invalid token'})
    }
}

module.exports = routes;