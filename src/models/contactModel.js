// const mongoose = require("mongoose")
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageModel = new Schema({
    name:{
        type: 'string',
        required: true,
        min:6,
        max: 50

    },
    email:{
        type: 'string',
        required: true,
        min:5,
        max: 50

    },
    message: {
        type: 'string',
        required: true,
        min:5,
        max:255
    },
    OnDate:{
        type: 'date',
        default: Date.now()
    }
});
const Message =  mongoose.model('Message' , MessageModel)

module.exports = Message;