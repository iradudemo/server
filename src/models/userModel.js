import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserModel = new Schema({

    firstname:{
        type: 'string',
        required: true,
        min:6,
        max: 60
    },
    lastname:{
        type: 'string',
        required: true,
        min:6,
        max: 60
    },
    username:{
        type: 'string',
        required: true,
        min:6,
        max: 15
    },
    email:{
        type: 'string',
        required: true,
        min:50,
        max: 300

    },
    password:{
        type: 'string',
        required: true,
        min:6,
        max:12
    },
    userRole: {
        type: 'string',
        default:"user"
    },
    createdDate:{
        type: 'date',
        default: Date.now()
    },
    
});

UserModel.pre('save', async function(next){
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt)
next()
});


const User =  mongoose.model('User' , UserModel)

module.exports = User;