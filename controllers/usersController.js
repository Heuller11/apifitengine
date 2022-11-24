const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Model
const User = require('../models/User')

module.exports = {
    async signup(req,res){
        const {name, email, password} = req.body;

        //check if user exists
        const userExists = await User.findOne({email: email});
        if(userExists){
            return res.status(422).json({msg: 'E-mail already used'});
        }
    
        //security password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
    
        const date = Date.now();
    
        //create user
        const user = new User({
            name,
            email,
            password : passwordHash,
            created_at: date,
            updated_at: date
        })
    
        try {
            
            await user.save();
            res.status(201).json({
                user
            })
    
            
        } catch (error) {
            res.status(500).json({
                msg: 'Error! Try again later'
            });
        }
    },

    async login(req,res){
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

            res.status(200).json({token})
            
        } catch (error) {
            res.status(500).json({
                msg: 'Error! Try again later'
            });
        }
    }
}
