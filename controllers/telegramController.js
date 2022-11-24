require ('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

module.exports = {
    async sendMessageHalfTime(req,res) {
        const {message} = req.body;
        console.log(message);
        try {
            bot.telegram.sendMessage(-838315102, message);
            res.status(201).json({
                msg: 'Message sent'
            })
        } catch (error) {
            res.status(500).json({
                msg: 'Error! Contact admin'
            });
        }
        
    }
}