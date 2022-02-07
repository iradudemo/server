// const mongoose = require("mongoose")
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArticleModel = new Schema({
    title:{
        type: 'string',
        required: true,
        min:6,
        max: 60

    },
    articleBody:{
        type: 'string',
        required: true,
        max: 3000

    },
    imageUrl:{
        type: 'string',
        
    },
    likes: [],

    Comments: [],
    
    createdDate:{
        type: 'date',
        default: Date.now()
    },
});
const Article =  mongoose.model('Article' , ArticleModel)

module.exports = Article;